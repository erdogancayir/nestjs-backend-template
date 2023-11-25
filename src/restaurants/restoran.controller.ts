import { Controller } from "@nestjs/common";
import { RestoranService } from "./restoran.service";

@Controller('restoranlar')
export class RestoranController {
    constructor(private readonly restoranService: RestoranService) {}

    // HTTP istekleri için metodlar...
}