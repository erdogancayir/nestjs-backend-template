import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateReviewDto } from "./dto/create-review.dto";
import { Review } from "./interfaces/review.interface";
import { Model } from "mongoose";

@Injectable()
export class ReviewService {
    constructor(@InjectModel('Review') private readonly reviewModel: Model<Review>) {}

    async create(createReviewDto: CreateReviewDto): Promise<Review> {
        const newReview = new this.reviewModel(createReviewDto);
        return await newReview.save();
    }

    // Diğer review işlemleri...
}