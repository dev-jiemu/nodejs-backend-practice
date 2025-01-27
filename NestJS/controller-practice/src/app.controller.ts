import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    // -, . 빼고 무슨 문자가 가운데 오던 받아줌
    @Get('/he*lo')
    getHello(@Req() req: Request): string {
        console.log(req)
        return this.appService.getHello()
    }
}
