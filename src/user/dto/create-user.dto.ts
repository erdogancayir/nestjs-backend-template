import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {

  // fullName alanı, kullanıcının tam adını temsil eder. 
  // Bu alan boş bırakılamaz ve string türünde olmalıdır.
  // En az 5 karakter ve en fazla 255 karakter uzunluğunda olabilir.
  @ApiProperty({
    example: 'erdogan cayir',
    description: 'The name of the User',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  readonly fullName: string;

  // Email alanı, kullanıcının e-posta adresini temsil eder. 
  // Bu alan boş bırakılamaz ve geçerli bir e-posta formatında olmalıdır.
  // Ayrıca, en az 5 karakter ve en fazla 255 karakter uzunluğunda olabilir.
  @ApiProperty({
    example: 'erdogancayir@gmail.com',
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

  // Password alanı, kullanıcının şifresini temsil eder.
  // Bu alan boş bırakılamaz ve string türünde olmalıdır.
  // En az 5 karakter ve en fazla 1024 karakter uzunluğunda olabilir.
  @ApiProperty({
    example: 'secret password change me!',
    description: 'The password of the User',
    format: 'string',
    minLength: 5,
    maxLength: 1024,
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  readonly password: string;
}
