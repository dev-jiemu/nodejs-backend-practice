import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly configService: ConfigService) {
    }

    @Get()
    getHello(): string {
        return process.env.DATABASE_HOST
    }

    @Get('/db-info-from-config')
    getDatabaseInfoFromConfigService(): Object {
        return {
            database_host: this.configService.get('DATABASE_HOST'),
            database_name: this.configService.get('DATABASE_NAME'),
            database_username: this.configService.get('DATABASE_USERNAME'),
            database_password: this.configService.get('DATABASE_PASSWORD'),
            database_synchronize: this.configService.get('DATABASE_SYNCHRONIZE')
        }
    }
}
