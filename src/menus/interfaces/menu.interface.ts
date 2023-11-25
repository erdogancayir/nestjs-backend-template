import { Document } from 'mongoose';

export interface Menu extends Document {
    name: string;
    price: number;
    content: string;
    coverImage?: string;
    restaurant: string; // Restaurant ID
}