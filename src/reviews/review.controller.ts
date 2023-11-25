import { Body, Controller, Post } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { ReviewService } from "./review.service";
import { Review } from "./interfaces/review.interface";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('reviews') 
@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}


    /**
     * POST isteği ile yeni bir yorum ekler.
     * @param createReviewDto - Yorumun DTO'su.
     * @returns Eklenen yorum.
     */
    @Post()
    async addReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
        return await this.reviewService.create(createReviewDto);
    }

    // Diğer review ile ilgili endpointler...
}