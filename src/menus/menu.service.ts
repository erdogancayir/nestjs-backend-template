import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { Menu } from "./interfaces/menu.interface";
import { Model } from "mongoose";

@Injectable()
export class MenuService {
    constructor(@InjectModel('Menu') private readonly menuModel: Model<Menu>) {}

    /**
     * Tüm menü öğelerini bulur.
     * @returns Menü öğelerinin listesi.
     */
    async findAll(): Promise<Menu[]> {
        return await this.menuModel.find();
    }

     /**
     * Yeni bir menü öğesi oluşturur.
     * @param createMenuDto - Menü öğesinin DTO'su.
     * @returns Oluşturulan menü öğesi.
     */
    async create(createMenuDto: CreateMenuDto): Promise<Menu> {
        const newMenu = new this.menuModel(createMenuDto);
        return await newMenu.save();
    }

    /**
     * Belirli bir menü öğesini günceller.
     * @param id - Menü öğesinin ID'si.
     * @param updateMenuDto - Güncellenecek menü öğesinin DTO'su.
     * @returns Güncellenen menü öğesi.
     */
    async update(id: string, updateMenuDto: CreateMenuDto): Promise<Menu> {
        return await this.menuModel.findByIdAndUpdate(id, updateMenuDto, { new: true });
    }

    /**
     * Belirli bir menü öğesini siler.
     * @param id - Menü öğesinin ID'si.
     * @returns Silme işleminin sonucu.
     */
    async delete(id: string): Promise<any> {
        return await this.menuModel.findByIdAndRemove(id);
    }

    /**
     * Birden fazla menü öğesini belirli bir restorana ekler.
     * @param menuItems - Eklenecek menü öğelerinin listesi.
     * @param restaurantId - Menü öğelerinin ekleneceği restoranın ID'si.
     */
    async addMenuItems(menuItems: CreateMenuDto[], restaurantId: string): Promise<void> {
        const session = await this.menuModel.db.startSession();
        session.startTransaction();
        try {
            for (let menuItemData of menuItems) {
                const menuItem = new this.menuModel({
                    ...menuItemData,
                    restaurant: restaurantId
                });
                await menuItem.save({ session });
            }
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
}

