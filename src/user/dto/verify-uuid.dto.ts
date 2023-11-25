import { IsNotEmpty,  IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyUuidDto {
    // API dokümantasyonunda görünecek olan ve kullanıcının doğrulama sürecinde kullanacağı UUID.
    // Bu alan boş bırakılamaz ve geçerli bir UUID formatında olmalıdır.
    @ApiProperty({
        description: 'uuid to verify user',
        format: 'uuid',
        uniqueItems: true,
      })
    @IsNotEmpty()
    @IsUUID()
    readonly verification: string;
}
