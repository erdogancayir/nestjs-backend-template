import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateReviewDto } from "./dto/create-review.dto";
import { Review } from "./interfaces/review.interface";
import { Model } from "mongoose";
import { Restoran } from "src/restaurants/interfaces/restoran.interface";

@Injectable()
export class ReviewService {
    constructor(@InjectModel('Review') private readonly reviewModel: Model<Review>,
    @InjectModel('Restaurant') private readonly restaurantModel: Model<Restoran>) {}


     /**
     * Yeni bir yorum oluşturur.
     * @param createReviewDto - Yorumun DTO'su.
     * @returns Oluşturulan yorum.
     */
    async create(createReviewDto: CreateReviewDto): Promise<Review> {
        const newReview = new this.reviewModel(createReviewDto);
        return await newReview.save();
    }

    /**
     * Yorum ekler ve ilgili restoranın ortalama puanını günceller.
     * @param createReviewDto - Yorumun DTO'su.
     * @returns Eklenen yorum.
     */
    async addReviewWithRating(createReviewDto: CreateReviewDto): Promise<Review> {
        const newReview = new this.reviewModel(createReviewDto);
        const review = await newReview.save();

        await this.updateRestaurantRating(review.restaurant);

        return review;
    }

     /**
     * Belirtilen restoranın ortalama puanını günceller.
     * @param restaurantId - Restoranın ID'si.
     */
    private async updateRestaurantRating(restaurantId: string): Promise<void> {
        const reviews = await this.reviewModel.find({ restaurant: restaurantId });
        if (reviews.length > 0) {
            const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
            await this.restaurantModel.findByIdAndUpdate(restaurantId, { averageRating });
        }
    }

    // Diğer review işlemleri...
}