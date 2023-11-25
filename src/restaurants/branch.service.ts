import { Injectable } from '@nestjs/common';
import { Branch } from './interfaces/branch.interface';
import { Model } from 'mongoose';
import { CreateBranchDto } from './dto/create-branch.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BranchService {
    constructor(@InjectModel('Branch') private readonly branchModel: Model<Branch>) {}

    async findAll(): Promise<Branch[]> {
        return await this.branchModel.find();
    }

    async create(createBranchDto: CreateBranchDto): Promise<Branch> {
        const newBranch = new this.branchModel(createBranchDto);
        return await newBranch.save();
    }

    async update(id: string, updateBranchDto: CreateBranchDto): Promise<Branch> {
        return await this.branchModel.findByIdAndUpdate(id, updateBranchDto, { new: true });
    }

    async delete(id: string): Promise<any> {
        return await this.branchModel.findByIdAndRemove(id);
    }
}
