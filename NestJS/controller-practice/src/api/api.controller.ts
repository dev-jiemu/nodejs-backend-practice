import { Controller, Get, HostParam } from '@nestjs/common';

// 하위 도메인 처리 할꺼면 host 지정
@Controller({ host: ':version.api.localhost' })
export class ApiController {

    @Get()
    index(@HostParam('version') version: string): string {
        return `Hello, API ${version}`
    }
}
