// api/src/user/dto/add-address.dto.ts
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddAddressDto {
    // Şehir adı. Bu alan boş bırakılamaz ve maksimum 100 karakter uzunluğunda olmalıdır.
    @ApiProperty({ example: 'Ankara', description: 'City name' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    readonly city: string;

    // İlçe adı. Bu alan boş bırakılamaz ve maksimum 100 karakter uzunluğunda olmalıdır.
    @ApiProperty({ example: 'Çankaya', description: 'District name' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    readonly district: string;

    // Açık adres. Bu alan boş bırakılamaz ve maksimum 255 karakter uzunluğunda olmalıdır.
    @ApiProperty({ example: '1234 Street, No: 56', description: 'Open address' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    readonly openAddress: string;
}
