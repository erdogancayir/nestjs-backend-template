// api/src/orders/dto/create-order.dto.ts
import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ example: '5f8d04b3ab35de3d342acd4b', description: 'User ID who is placing the order' })
    @IsNotEmpty()
    @IsMongoId()
    readonly user: string; // User ID

    @ApiProperty({ example: '5f8d04b3ab35de3d342acd4c', description: 'ID of the restaurant where the order is being placed' })
    @IsNotEmpty()
    @IsMongoId()
    readonly restaurant: string; // Restaurant ID

    @ApiProperty({ example: '123 Main St, Apartment 4', description: 'Delivery address for the order' })
    @IsNotEmpty()
    @IsString()
    readonly address: string; // Delivery address
    // Other order details...
}
