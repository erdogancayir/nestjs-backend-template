// api/src/menus/dto/create-menu.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
    @ApiProperty({ example: 'Margherita Pizza', description: 'Name of the menu item' })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({ example: 9.99, description: 'Price of the menu item' })
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @ApiProperty({ example: 'Cheese, tomato, basil', description: 'Ingredients of the menu item' })
    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @ApiProperty({ example: 'https://example.com/menu-item.jpg', description: 'Cover image URL for the menu item' })
    @IsString()
    readonly coverImage: string;

    @ApiProperty({ example: '5f8d04b3ab35de3d342acd4c', description: 'ID of the restaurant to which the menu belongs' })
    @IsNotEmpty()
    @IsMongoId()
    readonly restaurant: string; // Restaurant ID
}
