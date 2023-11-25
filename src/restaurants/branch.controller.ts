import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { Branch } from './interfaces/branch.interface';

@Controller('branches')
export class BranchController {
    constructor(private readonly branchService: BranchService) {}

    /**
     * Tüm şubeleri listeler.
     * @returns Şubelerin listesi.
     */
    @Get()
    async getAllBranches(): Promise<Branch[]> {
        return await this.branchService.findAll();
    }

    /**
     * Yeni bir şube ekler.
     * @param createBranchDto - Şube oluşturma için gerekli veriler.
     * @returns Eklenen şube.
     */
    @Post()
    async addBranch(@Body() createBranchDto: CreateBranchDto): Promise<Branch> {
        return await this.branchService.create(createBranchDto);
    }

    /**
     * Belirli bir şubenin bilgilerini günceller.
     * @param id - Güncellenecek şubenin ID'si.
     * @param updateBranchDto - Güncellenecek şube bilgileri.
     * @returns Güncellenmiş şube.
     */
    @Put(':id')
    async updateBranch(@Param('id') id: string, @Body() updateBranchDto: CreateBranchDto): Promise<Branch> {
        return await this.branchService.update(id, updateBranchDto);
    }

    /**
     * Belirli bir şubeyi siler.
     * @param id - Silinecek şubenin ID'si.
     * @returns Silme işleminin sonucu.
     */
    @Delete(':id')
    async deleteBranch(@Param('id') id: string): Promise<any> {
        return await this.branchService.delete(id);
    }
}
