import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestoranDto {
    @ApiProperty({ example: 'Restaurant Name', description: 'Name of the restaurant' })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({ example: 'Description of the restaurant', description: 'Description' })
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty({ example: 'https://example.com/logo.jpg', description: 'Logo URL of the restaurant', required: false })
    @IsOptional()
    @IsString()
    readonly logo?: string;

    @ApiProperty({ description: 'Address of the restaurant' })
    @IsNotEmpty()
    readonly address: {
        city: string;
        district: string;
        openAddress: string;
    };

    @ApiProperty({ description: 'Location of the restaurant' })
    @IsNotEmpty()
    readonly location: {
        lat: number;
        lon: number;
    };
    // Other fields...
}
