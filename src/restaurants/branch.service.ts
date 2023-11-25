import { Injectable } from '@nestjs/common';
import { Branch } from './interfaces/branch.interface';
import { Model } from 'mongoose';
import { CreateBranchDto } from './dto/create-branch.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BranchService {
    constructor(@InjectModel('Branch') private readonly branchModel: Model<Branch>) {}

    /**
     * Tüm şubeleri listeler.
     * @returns Şubelerin listesi.
     */
    async findAll(): Promise<Branch[]> {
        return await this.branchModel.find();
    }

    /**
     * Yeni bir şube oluşturur.
     * @param createBranchDto - Şube oluşturma için gerekli veriler.
     * @returns Oluşturulan şube.
     */
    async create(createBranchDto: CreateBranchDto): Promise<Branch> {
        const newBranch = new this.branchModel(createBranchDto);
        return await newBranch.save();
    }

    /**
     * Belirli bir şubenin bilgilerini günceller.
     * @param id - Güncellenecek şubenin ID'si.
     * @param updateBranchDto - Güncellenecek şube bilgileri.
     * @returns Güncellenmiş şube.
     */
    async update(id: string, updateBranchDto: CreateBranchDto): Promise<Branch> {
        return await this.branchModel.findByIdAndUpdate(id, updateBranchDto, { new: true });
    }

    /**
     * Belirli bir şubeyi siler.
     * @param id - Silinecek şubenin ID'si.
     * @returns Silme işleminin sonucu.
     */
    async delete(id: string): Promise<any> {
        return await this.branchModel.findByIdAndRemove(id);
    }
}
