import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { UserSchema } from "src/user/schemas/user.schema";
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
         // User modeli için Mongoose şemasını tanımlar.
        MongooseModule.forFeature([
            {name: 'User', schema: UserSchema}
        ]),
        // Passport modülünü uygulamaya dahil eder.
        PassportModule,
        // JWT modülünü yapılandırır. Gizli anahtar ve diğer seçenekleri tanımlar.
        JwtModule.register({
            secret: process.env.JWT_SECRET,  // JWT'ler için kullanılacak gizli anahtar.
            signOptions: { expiresIn: process.env.JWT_EXPIRATION }, // Token'ların geçerlilik süresi.
        }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
