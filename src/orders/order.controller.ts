import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderService } from "./order.service";
import { Order } from "./interfaces/order.interface";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    /**
     * POST isteği ile yeni bir sipariş oluşturur.
     * @param createOrderDto - Siparişin DTO'su.
     * @returns Oluşturulan sipariş.
     */
    @Post()
    async placeOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return await this.orderService.create(createOrderDto);
    }

    /**
     * Belirli bir kullanıcıya ait tüm siparişleri getirir.
     * @param userId - Kullanıcının ID'si.
     * @returns Kullanıcının siparişlerinin listesi.
     */
    @Get('user/:userId')
    async getUserOrders(@Param('userId') userId: string): Promise<Order[]> {
        return await this.orderService.findByUser(userId);
    }
}