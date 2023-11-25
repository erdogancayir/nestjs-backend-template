import { Document } from 'mongoose';

export interface Branch extends Document {
    name: string;
    address: {
        city: string;
        district: string;
        openAddress: string;
    };
    location: {
        lat: number;
        lon: number;
    };
}
