import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import config from './configs/config'

console.log(`env : ${process.env.NODE_ENV}`);
console.log(`current working directory : ${process.cwd()}`);

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
    load: [config],
    cache: true, // 한번 로드하면 잘 안 바뀌니까
    expandVariables: true, // 확장변수 사용
  }), WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}