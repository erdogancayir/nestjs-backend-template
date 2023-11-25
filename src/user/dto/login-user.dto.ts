import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    // E-posta alanı, kullanıcının sisteme giriş yaparken kullanacağı e-posta adresini temsil eder.
    // Bu alan boş bırakılamaz, geçerli bir e-posta formatında olmalı ve string türünde olmalıdır.
    // E-posta adresi en az 5 karakter ve en fazla 255 karakter uzunluğunda olabilir.
    
    @ApiProperty({
      example: 'erdogan@gmail.com',
      description: 'The email of the User',
      format: 'email',
      uniqueItems: true,
      minLength: 5,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsEmail()
    readonly email: string;

    // Şifre alanı, kullanıcının sisteme giriş yaparken kullanacağı şifreyi temsil eder.
    // Bu alan boş bırakılamaz ve string türünde olmalıdır.
    // Şifre en az 5 karakter ve en fazla 1024 karakter uzunluğunda olabilir.
    @ApiProperty({
      example: 'secret password change me!',
      description: 'The password of the User',
      format: 'string',
      minLength: 5,
      maxLength: 1024,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    readonly password: string;
  }
