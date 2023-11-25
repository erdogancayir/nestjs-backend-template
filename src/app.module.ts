import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from "./user/user.module";
import { ConfigModule } from '@nestjs/config';
import { RestoranModule } from "./restaurants/restoran.module";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      MongooseModule.forRoot(process.env.MONGO_URI),
      UserModule,
      RestoranModule,
    ],
})

export class AppModule{}