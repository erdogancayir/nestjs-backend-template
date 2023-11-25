import { Document } from 'mongoose';

export interface Restoran extends Document {
    name: string;
    description: string;
    logo?: string;
    address: {
        city: string;
        district: string;
        openAddress: string;
    };
    location: {
        lat: number;
        lon: number;
    };
    // Other fields...
}