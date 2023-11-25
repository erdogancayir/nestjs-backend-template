import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { Menu } from "./interfaces/menu.interface";
import { Model } from "mongoose";

@Injectable()
export class MenuService {
    constructor(@InjectModel('Menu') private readonly menuModel: Model<Menu>) {}

    async findAll(): Promise<Menu[]> {
        return await this.menuModel.find();
    }

    async create(createMenuDto: CreateMenuDto): Promise<Menu> {
        const newMenu = new this.menuModel(createMenuDto);
        return await newMenu.save();
    }

    async update(id: string, updateMenuDto: CreateMenuDto): Promise<Menu> {
        return await this.menuModel.findByIdAndUpdate(id, updateMenuDto, { new: true });
    }

    async delete(id: string): Promise<any> {
        return await this.menuModel.findByIdAndRemove(id);
    }
}

