import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';

// (process.env.NODE_ENV === 'production') ? '.production.env' : (process.env.NODE_ENV === 'stage') ? '.stage.env' : '.development.env'
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
            load: [emailConfig],
            isGlobal: true,
            validationSchema, // joi 활용해서 유효성 검사
        }),
        UsersModule,
        EmailModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
