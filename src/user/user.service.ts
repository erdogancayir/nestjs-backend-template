import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthService } from "../auth/auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { v4 } from 'uuid';
import { addHours } from 'date-fns';
import { User } from 'src/user/interfaces/user.interface';
import { VerifyUuidDto } from "./dto/verify-uuid.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import { MailService } from "./mail/mail";
import { AddAddressDto } from "./dto/add-address.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class UserService {
    // Kullanıcının doğrulama için verilen süre (saat cinsinden).
    HOURS_TO_VERIFY = 4;

    // Kullanıcının bloke edilmesi için verilen süre (saat cinsinden).
    HOURS_TO_BLOCK = 6;

    // Kullanıcının bloke edilmeden önce yapabileceği maksimum giriş deneme sayısı.
    LOGIN_ATTEMPTS_TO_BLOCK = 5;

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly authService: AuthService,
        private readonly mailService: MailService, ) {
    }

    // Yeni bir kullanıcı oluşturur. Bu metod, CreateUserDto'dan alınan verileri kullanarak
    // bir kullanıcı nesnesi oluşturur, e-posta adresinin benzersizliğini kontrol eder,
    // kayıt bilgilerini ayarlar ve kullanıcıyı veritabanına kaydeder.
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new this.userModel(createUserDto)
        await this.isEmailUnique(user.email);
        this.setRegistrationInfo(user);
        await user.save();
        // Doğrulama e-postası gönder
        await this.mailService.sendVerificationEmail(user.email, user.verification);
        return this.buildRegistrationInfo(user);
    }

    async verifyEmail(req: Request, verifyUuidDto: VerifyUuidDto) {
        // UUID kullanarak doğrulanacak kullanıcıyı bulur.
        const user = await this.findByVerification(verifyUuidDto.verification);
        // Kullanıcıyı 'doğrulanmış' olarak işaretler.
        await this.setUserAsVerified(user);
        // Kullanıcı için erişim token'ı oluşturur ve kullanıcı bilgileri ile birlikte döndürür.
        return {
            fullName: user.fullName,
            email: user.email,
            accessToken: await this.authService.createAccessToken(user._id),
        }
    }

    async login(req: Request, loginUserDto: LoginUserDto) {
        // Kullanıcının e-posta adresini kullanarak kullanıcıyı bulur.
        const user = await this.findUserByEmail(loginUserDto.email);
        // Kullanıcının bloke olup olmadığını kontrol eder.
        this.isUserBlocked(user);
        // Kullanıcının girdiği şifre ile veritabanındaki şifre uyuşuyorsa devam eder.
        await this.checkPassword(loginUserDto.password, user);
        // Şifreler eşleşirse, kullanıcının giriş deneme sayısını sıfırlar.
        await this.passwordsAreMatch(user);
        // Kullanıcı için JWT erişim token'ı oluşturur ve kullanıcı bilgileri ile birlikte döndürür.
        return {
            fullName: user.fullName,
            email: user.email,
            accessToken: await this.authService.createAccessToken(user._id),
        };
    }

    async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<User> {
        return await this.userModel.findByIdAndUpdate(userId, updateProfileDto, { new: true });
    }

    async addAddress(userId: string, addAddressDto: AddAddressDto): Promise<User> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.address.push(addAddressDto);
        await user.save();
        return user;
    }

    private async findUserByEmail(email: string): Promise<User> {
        // Verilen e-posta adresine göre ve doğrulanmış kullanıcıyı bulur.
        // Kullanıcı bulunamazsa hata fırlatır.
        const user = await this.userModel.findOne({email, verified: true});
        if (!user) {
            throw new NotFoundException('Wrong email or password.');
        }
        return user;
    }

    private async passwordsAreMatch(user) {
        // Kullanıcının giriş deneme sayısını sıfırlar ve veritabanında günceller.
        user.loginAttempts = 0 ;
        await user.save();
    }

    private async checkPassword(attemptPass: string, user) {
        const match = await bcrypt.compare(attemptPass, user.password);
        if (!match) {
            await this.passwordsDoNotMatch(user);
            throw new NotFoundException('Wrong email or password.');
        }
        return match;
    }

    private async passwordsDoNotMatch(user) {
        user.loginAttempts += 1;
        await user.save();
        if (user.loginAttempts >= this.LOGIN_ATTEMPTS_TO_BLOCK) {
            await this.blockUser(user);
            throw new ConflictException('User blocked.');
        }
    }

    private async blockUser(user) {
        user.blockExpires = addHours(new Date(), this.HOURS_TO_BLOCK);
        await user.save();
    }

    private isUserBlocked(user) {
        if (user.blockExpires > Date.now()) {
            throw new ConflictException('User has been blocked try later.');
        }
    }

    private async setUserAsVerified(user) {
        // Kullanıcının 'verified' alanını true olarak günceller ve veritabanında kaydeder.
        user.verified = true;
        await user.save();
    }

    private async findByVerification(verification: string): Promise<User> {
        // Verilen UUID'ye ve doğrulama süresi geçmemiş olmasına göre kullanıcıyı bulur.
        // Eğer kullanıcı bulunamazsa BadRequestException fırlatır.
        const user = await this.userModel.findOne({verification, verified: false, verificationExpires: {$gt: new Date()}});
        if (!user) {
            throw new BadRequestException('Bad request.');
        }
        return user;
    }

    // Kullanıcının kayıt sonrası döndürülecek bilgilerini oluşturur.
    // Bu, genellikle kullanıcıya dönülen temel bilgileri içerir.
    private buildRegistrationInfo(user): any {
        const userRegistrationInfo = {
            fullName: user.fullName,
            email: user.email,
            verified: user.verified,
        };
        return userRegistrationInfo;
    }

    // Kullanıcı için kayıt sırasında gerekli olan bilgileri ayarlar.
    // Bu, doğrulama kodunu oluşturma ve son kullanma tarihini ayarlama işlemlerini içerir.
    private setRegistrationInfo(user): any {
        user.verification = v4(); // UUID formatında benzersiz bir doğrulama kodu oluşturur.
        user.verificationExpires = addHours(new Date(), this.HOURS_TO_VERIFY);// Doğrulama kodunun son kullanma süresini belirler.
    }

    // Verilen e-posta adresinin veritabanında benzersiz olup olmadığını kontrol eder.
    // Eğer aynı e-posta adresine sahip doğrulanmış bir kullanıcı varsa, bir hata fırlatır.
    private async isEmailUnique(email: string) {
        console.log(`Checking if email ${email} is unique...`);
        const user = await this.userModel.findOne({email, verified: true}); //verified alanı false ise), aynı e-posta adresiyle yeni bir kayıt oluşturulabilir.
        if (user) {
            throw new BadRequestException('Email most be unique.');
        }
    }
    
}
