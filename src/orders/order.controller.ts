import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderService } from "./order.service";
import { Order } from "./interfaces/order.interface";

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async placeOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return await this.orderService.create(createOrderDto);
    }

    @Get('user/:userId')
    async getUserOrders(@Param('userId') userId: string): Promise<Order[]> {
        return await this.orderService.findByUser(userId);
    }
}