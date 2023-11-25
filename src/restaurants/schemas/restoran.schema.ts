import * as mongoose from 'mongoose';
import { BranchSchema } from './branch.schema';

const RestoranSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    logo: String,
    address: {
        city: String,
        district: String,
        openAddress: String
    },
    location: {
        lat: Number,
        lon: Number
    },
    branches: [BranchSchema] // Branches of the restaurant
});

export { RestoranSchema };
