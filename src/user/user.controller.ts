import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { RolesGuard } from "src/auth/guards/roles.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { VerifyUuidDto } from "./dto/verify-uuid.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { Roles } from './../auth/decorators/roles.decorator';
import { AddAddressDto } from "./dto/add-address.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { User } from "./interfaces/user.interface";
import { AuthGuard } from "@nestjs/passport";

/* 
Swagger dokümantasyonunda ilgili controller altındaki tüm route'ları (yolları) bu etiket altında gruplamak için kullanılır
*/
@ApiTags('users') // UserController icin Swagger UI'de bir etiket (tag) oluşturuyoruz.
@Controller('users') // HTTP controller olduğunu ve 'users' yoluna cevap verdiğini belirtir.
@UseGuards(RolesGuard)
export class UserController {
    constructor( private readonly userService: UserService) {}
    
    /**
     * Yeni bir kullanıcı kaydeder.
     * @param createUserDto - Kullanıcı oluşturma için gerekli veriler.
     * @returns Oluşturulan kullanıcı.
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Register user' })
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto)
    }

    /**
     * Kullanıcı email doğrulaması yapar.
     * @param req - HTTP isteği.
     * @param verifyUuidDto - Doğrulama için UUID.
     * @returns Doğrulama sonucu.
     */
    @Post('verify-email')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Verify user email' })
    @ApiOkResponse({})
    async verifyEmail(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
        return await this.userService.verifyEmail(req, verifyUuidDto);
    }

     /**
     * Kullanıcı girişi yapar.
     * @param req - HTTP isteği.
     * @param loginUserDto - Giriş yapacak kullanıcı bilgileri.
     * @returns Giriş işlemi sonucu.
     */
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Login User',})
    @ApiOkResponse({})
    async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
        // UserService içindeki login metodunu çağırarak işlemi gerçekleştirir.
        return await this.userService.login(req, loginUserDto);
    }

    /**
     * Kullanıcının adres bilgisi ekler.
     * @param userId - Kullanıcının ID'si.
     * @param addAddressDto - Eklenen adres bilgisi.
     * @returns Güncellenmiş kullanıcı bilgisi.
     */
    @Post(':userId/address')
    @UseGuards(AuthGuard('jwt'))
    async addAddress(@Param('userId') userId: string, @Body() addAddressDto: AddAddressDto) {
        return await this.userService.addAddress(userId, addAddressDto);
    }

    /**
     * Kullanıcının profil bilgilerini günceller.
     * @param userId - Kullanıcının ID'si.
     * @param updateProfileDto - Güncellenecek profil bilgileri.
     * @returns Güncellenmiş kullanıcı.
     */
    @Put(':id/profile')
    async updateProfile(@Param('id') userId: string, @Body() updateProfileDto: UpdateProfileDto): Promise<User> {
        return await this.userService.updateProfile(userId, updateProfileDto);
    }

    @Get('data')
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({summary: 'A private route for check the auth',})
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({})
    findAll() {
        return this.userService.findAll();
    }
    
}