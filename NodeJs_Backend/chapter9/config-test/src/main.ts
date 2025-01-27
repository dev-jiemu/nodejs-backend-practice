import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService) // main.ts 에서 설정하는 법
  await app.listen(configService.get("SERVER_PORT"))
  //await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
