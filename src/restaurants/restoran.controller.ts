import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RestoranService } from "./restoran.service";
import { Restoran } from "./interfaces/restoran.interface";
import { CreateRestoranDto } from "./dto/create-restoran.dto";

@Controller('restoranlar')
export class RestoranController {
    constructor(private readonly restoranService: RestoranService) {}

    @Get()
    async getAllRestaurants(): Promise<Restoran[]> {
        return await this.restoranService.findAll();
    }

    @Post()
    async addRestaurant(@Body() createRestoranDto: CreateRestoranDto): Promise<Restoran> {
        return await this.restoranService.create(createRestoranDto);
    }

    @Put(':id')
    async updateRestaurant(@Param('id') id: string, @Body() updateRestoranDto: CreateRestoranDto): Promise<Restoran> {
        return await this.restoranService.update(id, updateRestoranDto);
    }

    @Delete(':id')
    async removeRestaurant(@Param('id') id: string): Promise<any> {
        return await this.restoranService.delete(id);
    }
}