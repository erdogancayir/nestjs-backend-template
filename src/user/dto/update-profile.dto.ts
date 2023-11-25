import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
    // Kullanıcı adı. Opsiyonel bir alan ve maksimum 50 karakter uzunluğunda olabilir.
    @ApiProperty({ example: 'new_username', description: 'New username', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    readonly username?: string;

    // E-posta adresi. Opsiyonel bir alan ve geçerli bir e-posta formatında olmalıdır.
    @ApiProperty({ example: 'new_email@example.com', description: 'New email address', required: false })
    @IsOptional()
    @IsEmail()
    @MaxLength(100)
    readonly email?: string;

    // Yaş. Opsiyonel bir alan.
    readonly age?: number;

    // Cinsiyet. Opsiyonel bir alan.
    readonly gender?: string;

    // Profil resmi URL'si. Opsiyonel bir alan ve maksimum 255 karakter uzunluğunda olabilir.
    @ApiProperty({ example: 'https://example.com/profile.jpg', description: 'Profile picture URL', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    readonly profilPicture?: string;
}