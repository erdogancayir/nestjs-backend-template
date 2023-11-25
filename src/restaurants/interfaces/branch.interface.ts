import { Document } from 'mongoose';

export interface Branch extends Document {
    ad: string;
    adres: {
        il: string;
        ilce: string;
        acikAdres: string;
    };
    lokasyon: {
        lat: number;
        lon: number;
    };
}