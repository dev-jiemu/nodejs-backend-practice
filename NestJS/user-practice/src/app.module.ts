import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/email';
import { validationSchema } from './config/validation-schema';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import * as path from 'node:path';

// (process.env.NODE_ENV === 'production') ? '.production.env' : (process.env.NODE_ENV === 'stage') ? '.stage.env' : '.development.env'
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [path.resolve(process.cwd(), `config/env/.${process.env.NODE_ENV}.env`)],
            load: [emailConfig],
            isGlobal: true,
            validationSchema, // joi 활용해서 유효성 검사
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: 3306,
            database: process.env.DATABASE_NAME,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
        }),
        UsersModule,
        EmailModule,
        AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
