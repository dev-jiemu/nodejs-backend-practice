import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// dotenv.config({
//     path: path.resolve(
//             (process.env.NODE_ENV === 'production') ? '.production.env' :
//             (process.env.NODE_ENV === 'stage') ? '.stage.env' : '.development.env'
//     ),
// });

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
