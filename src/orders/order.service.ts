import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./interfaces/order.interface";

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) {}

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const newOrder = new this.orderModel(createOrderDto);
        return await newOrder.save();
    }

    async findByUser(userId: string): Promise<Order[]> {
        return await this.orderModel.find({ user: userId });
    }
}

