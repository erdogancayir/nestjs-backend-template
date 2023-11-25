import { Body, Controller, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from "src/auth/guards/roles.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { VerifyUuidDto } from "./dto/verify-uuid.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { Roles } from './../auth/decorators/roles.decorator';
import { AddAddressDto } from "./dto/add-address.dto";

/* 
Swagger dokümantasyonunda ilgili controller altındaki tüm route'ları (yolları) bu etiket altında gruplamak için kullanılır
*/
@ApiTags('users') // UserController icin Swagger UI'de bir etiket (tag) oluşturuyoruz.
@Controller('users') // HTTP controller olduğunu ve 'users' yoluna cevap verdiğini belirtir.
@UseGuards(RolesGuard)
export class UserController {
    constructor( private readonly userService: UserService) {}
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Register user' })
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto)
    }

    // Kullanicinin email adresine gonderilen dogrulama ile ilgili islemleri yapan route.
    @Post('verify-email')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Verify user email' })
    @ApiOkResponse({})
    async verifyEmail(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
        return await this.userService.verifyEmail(req, verifyUuidDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Login User',})
    @ApiOkResponse({})
    async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
        // UserService içindeki login metodunu çağırarak işlemi gerçekleştirir.
        return await this.userService.login(req, loginUserDto);
    }

    @Post(':userId/address')
    async addAddress(@Param('userId') userId: string, @Body() addAddressDto: AddAddressDto) {
        return await this.userService.addAddress(userId, addAddressDto);
    }
}