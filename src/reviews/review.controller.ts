import { Body, Controller, Post } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { ReviewService } from "./review.service";
import { Review } from "./interfaces/review.interface";

@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post()
    async addReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
        return await this.reviewService.create(createReviewDto);
    }

    // Diğer review ile ilgili endpointler...
}