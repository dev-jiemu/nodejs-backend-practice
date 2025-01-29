import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


// dotenv.config({
//     path: path.resolve(
//             (process.env.NODE_ENV === 'production') ? '.production.env' :
//             (process.env.NODE_ENV === 'stage') ? '.stage.env' : '.development.env'
//     ),
// });

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 파이프를 전역으로 지정하고 싶다면 이렇게
    app.useGlobalPipes(new ValidationPipe({
        transform: true, // class-transformer 적용하려면 true
    }));
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
