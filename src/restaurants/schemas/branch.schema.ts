import * as mongoose from 'mongoose';

const BranchSchema = new mongoose.Schema({
    ad: String, // Şubenin adı
    adres: {
        il: String,
        ilce: String,
        acikAdres: String
    },
    lokasyon: {
        lat: Number,
        lon: Number
    }
    // Şube için ek alanlar eklenebilir
});

export { BranchSchema };
