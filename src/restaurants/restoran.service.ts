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

    /**
     * Belirtilen koordinatlara en yakın restoranları bulur.
     * @param lat - Enlem koordinatı.
     * @param lng - Boylam koordinatı.
     * @param maxDistance - Maksimum mesafe (metre cinsinden).
     * @returns Yakındaki restoranların listesi.
     */
    async findNearby(lat: number, lng: number, maxDistance: number): Promise<Restoran[]> {
        return await this.restoranModel.find({
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat]
                    },
                    $maxDistance: maxDistance
                }
            }
        });
    }

    /**
     * Belirtilen kriterlere göre restoranları arar.
     * @param criteria - Arama kriterleri.
     * @returns Kriterlere uygun restoranların listesi.
     */
    async findRestaurantsByCriteria(criteria: any): Promise<Restoran[]> {
        return await this.restoranModel.find(criteria).select('name categories description');
    }

    /**
     * Restoranları sayfa numarasına ve sayfa boyutuna göre sıralar.
     * @param page - Sayfa numarası.
     * @param pageSize - Sayfa başına düşen restoran sayısı.
     * @returns Sayfalandırılmış restoranların listesi.
     */
    async getRestaurantsPaginated(page: number, pageSize: number): Promise<Restoran[]> {
        return await this.restoranModel.find().sort({ 'averageRating': -1 }).skip((page - 1) * pageSize).limit(pageSize);
    }
}
