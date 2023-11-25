import { Document } from 'mongoose';

export interface Review extends Document {
    comment: string; // Yorum içeriği
    rating: number; // Puanlama
    user: string; // Kullanıcı ID
    restaurant: string; // Restoran ID
    date: Date; // Yorum tarihi
}