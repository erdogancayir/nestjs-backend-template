import { IsNotEmpty, IsString, Max, Min, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
    @ApiProperty({ example: 'Great food!', description: 'The content of the review' })
    @IsNotEmpty()
    @IsString()
    readonly comment: string;

    @ApiProperty({ example: 5, description: 'The rating given to the restaurant', minimum: 1, maximum: 5 })
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    readonly rating: number;

    @ApiProperty({ example: '5f8d04b3ab35de3d342acd4b', description: 'User ID who is giving the review' })
    @IsNotEmpty()
    @IsMongoId()
    readonly user: string; // User ID

    @ApiProperty({ example: '5f8d04b3ab35de3d342acd4c', description: 'ID of the restaurant being reviewed' })
    @IsNotEmpty()
    @IsMongoId()
    readonly restaurant: string; // Restaurant ID
}
