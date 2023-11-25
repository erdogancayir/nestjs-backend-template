import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { Branch } from './interfaces/branch.interface';

@Controller('branches')
export class BranchController {
    constructor(private readonly branchService: BranchService) {}

    @Get()
    async getAllBranches(): Promise<Branch[]> {
        return await this.branchService.findAll();
    }

    @Post()
    async addBranch(@Body() createBranchDto: CreateBranchDto): Promise<Branch> {
        return await this.branchService.create(createBranchDto);
    }

    @Put(':id')
    async updateBranch(@Param('id') id: string, @Body() updateBranchDto: CreateBranchDto): Promise<Branch> {
        return await this.branchService.update(id, updateBranchDto);
    }

    @Delete(':id')
    async deleteBranch(@Param('id') id: string): Promise<any> {
        return await this.branchService.delete(id);
    }
}
