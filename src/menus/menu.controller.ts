import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { Menu } from "./interfaces/menu.interface";
import { MenuService } from "./menu.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('menus')
@Controller('menus')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    /**
     * Tüm menü öğelerini getirir.
     * @returns Menü öğelerinin listesi.
     */
    @Get()
    async getAllMenuItems(): Promise<Menu[]> {
        return await this.menuService.findAll();
    }

    /**
     * POST isteği ile yeni bir menü öğesi ekler.
     * @param createMenuDto - Menü öğesinin DTO'su.
     * @returns Eklenen menü öğesi.
     */
    @Post()
    async addMenuItem(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
        return await this.menuService.create(createMenuDto);
    }

    /**
     * Belirli bir menü öğesini günceller.
     * @param id - Menü öğesinin ID'si.
     * @param updateMenuDto - Güncellenecek menü öğesinin DTO'su.
     * @returns Güncellenen menü öğesi.
     */
    @Put(':id')
    async updateMenuItem(@Param('id') id: string, @Body() updateMenuDto: CreateMenuDto): Promise<Menu> {
        return await this.menuService.update(id, updateMenuDto);
    }

    /**
     * Belirli bir menü öğesini siler.
     * @param id - Menü öğesinin ID'si.
     * @returns Silme işleminin sonucu.
     */

    @Delete(':id')
    async deleteMenuItem(@Param('id') id: string): Promise<any> {
        return await this.menuService.delete(id);
    }
}
