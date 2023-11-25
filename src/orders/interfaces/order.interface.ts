import { Document } from 'mongoose';

export interface Order extends Document {
    date: Date; // Sipariş tarihi
    time: string; // Sipariş saati
    user: string; // Kullanıcı ID
    restaurant: string; // Restoran ID
    address: string; // Teslimat adresi
    // Diğer sipariş detayları...
}