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

    @Get('/db-host-from-config')
    getDatabaseHostFromConfigService(): string {
        return this.configService.get('DATABASE_HOST')
    }
}
