import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestoranController } from './restoran.controller';
import { RestoranService } from './restoran.service';
import { RestoranSchema } from './schemas/restoran.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Restoran', schema: RestoranSchema }])
    ],
    controllers: [RestoranController],
    providers: [RestoranService],
})
export class RestoranModule {}