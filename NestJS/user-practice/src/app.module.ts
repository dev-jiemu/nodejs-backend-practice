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
import * as winston from 'winston'
import { utilities as nestWinstonModuleUtilities, WinstonModule } from "nest-winston";
import { LoggerModule } from './logger/logger.module';
import { ExceptionModule } from './exception/exception.module';
import {LoggingModule} from "./logging/logging.module";
import { BatchModule } from './batch/batch.module';
import { TaskService } from './batch/task.service';
import { HealthCheckController } from './health-check/health-check.controller';
import {TerminusModule} from "@nestjs/terminus";
import { HttpModule } from '@nestjs/axios'

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
        AuthModule,
        LoggerModule,
        LoggingModule,
        ExceptionModule,
        BatchModule,
        TerminusModule,
        HttpModule,
    ],
    controllers: [AppController, HealthCheckController],
    providers: [AppService, TaskService],
})
export class AppModule {}
