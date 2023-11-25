import { Controller, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Restoran } from "./interfaces/restoran.interface";
import { Model } from "mongoose";
import { CreateRestoranDto } from "./dto/create-restoran.dto";

@Injectable()
export class RestoranService {
    constructor(@InjectModel('Restoran') private readonly restoranModel: Model<Restoran>) {}

    async findAll(): Promise<Restoran[]> {
        return await this.restoranModel.find();
    }

    async create(createRestoranDto: CreateRestoranDto): Promise<Restoran> {
        const newRestoran = new this.restoranModel(createRestoranDto);
        return await newRestoran.save();
    }

    async update(id: string, updateRestoranDto: CreateRestoranDto): Promise<Restoran> {
        return await this.restoranModel.findByIdAndUpdate(id, updateRestoranDto, { new: true });
    }

    async delete(id: string): Promise<any> {
        return await this.restoranModel.findByIdAndRemove(id);
    }
}
