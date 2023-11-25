import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { Menu } from "./interfaces/menu.interface";
import { MenuService } from "./menu.service";

@Controller('menus')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Get()
    async getAllMenuItems(): Promise<Menu[]> {
        return await this.menuService.findAll();
    }

    @Post()
    async addMenuItem(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
        return await this.menuService.create(createMenuDto);
    }

    @Put(':id')
    async updateMenuItem(@Param('id') id: string, @Body() updateMenuDto: CreateMenuDto): Promise<Menu> {
        return await this.menuService.update(id, updateMenuDto);
    }

    @Delete(':id')
    async deleteMenuItem(@Param('id') id: string): Promise<any> {
        return await this.menuService.delete(id);
    }
}
