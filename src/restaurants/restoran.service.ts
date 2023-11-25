import { Controller, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Restoran } from "./interfaces/restoran.interface";
import { Model } from "mongoose";

@Injectable()
export class RestoranService {
    constructor(@InjectModel('Restoran') private readonly restoranModel: Model<Restoran>) {}

    // Restoran ekleme, güncelleme, listeleme gibi metodlar...
}
