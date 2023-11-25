import * as mongoose from 'mongoose';
import { BranchSchema } from './branch.schema';

const RestoranSchema = new mongoose.Schema({
    ad: { type: String, required: true },
    aciklama: { type: String, required: true },
    logo: String,
    adres: {
        il: String,
        ilce: String,
        acikAdres: String
    },
    lokasyon: {
        lat: Number,
        lon: Number
    },
    subeler: [BranchSchema] // Restoranın şubeleri
});

export { RestoranSchema };