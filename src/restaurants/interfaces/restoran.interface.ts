import { Document } from 'mongoose';

export interface Restoran extends Document {
    ad: string;
    aciklama: string;
    logo: string;
    adres: {
        il: string;
        ilce: string;
        acikAdres: string;
    };
    lokasyon: {
        lat: number;
        lon: number;
    };
    // Diğer alanlar...
}
