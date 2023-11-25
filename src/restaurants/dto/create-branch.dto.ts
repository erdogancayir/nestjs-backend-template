import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto {
    @ApiProperty({ example: 'Branch Name', description: 'Name of the branch' })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({ description: 'Address of the branch' })
    @IsNotEmpty()
    readonly address: {
        city: string;
        district: string;
        openAddress: string;
    };

    @ApiProperty({ description: 'Location of the branch' })
    @IsNotEmpty()
    readonly location: {
        lat: number;
        lon: number;
    };
}
