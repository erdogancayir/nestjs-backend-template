import * as mongoose from 'mongoose';

const BranchSchema = new mongoose.Schema({
    name: String,
    address: {
        city: String,
        district: String,
        openAddress: String
    },
    location: {
        lat: Number,
        lon: Number
    }
});

export { BranchSchema };