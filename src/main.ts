import { NestFactory } from "@nestjs/core";
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { warn } from "console";
import { UserModule } from "./user/user.module";

//     ┓┏       ┏┓             ┏┓        //
//*    ┃┃┏┓┏┏┓  ┃   ┏┓  ┏  ┏┓  ┣┫┏┓┏┓    *//
//*    ┗┛┗┛┗┗┛  ┗┛  ┗┻  ┛  ┗   ┛┗┣┛┣┛    *//
//                               ┛ ┛     //

async function bootsrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log', 'debug', 'verbose'] });

  /* 
    Gelen verileri belirli kurallara göre doğrular. 
    Örneğin, bir HTTP isteğinde gönderilen verilerin tipi, uzunluğu veya formatı gibi özellikler kontrol edilir.
    Gelen verileri belirli tiplere dönüştürür. Örneğin, bir string ifadenin sayıya dönüştürülmesi.
  */
  app.useGlobalPipes(new ValidationPipe({
  }))

  /* 
    NestJS'te Swagger belgelerimizi oluşturmak için kullanacağız. 
    Swagger, API'lerimizi belgelemek, test etmek ve keşfetmek için kullanılacağız.
  */
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('API')  // API'mizdeki operasyonları gruplamak için
    .build()
  // Uygulamamızın modüllerini içerecek şekilde genişletir.
  const document = SwaggerModule.createDocument(app, options, {
    include: [
      UserModule,
    ]
  })
  // Oluşturulan Swagger belgesini '/api' yolunda kullanılabilir 
  //  hale getirir ve böylece bu adresten Swagger UI'ya erişilebilir.
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  warn(`APP IS LISTENING TO PORT ${PORT}`);
}

bootsrap()
