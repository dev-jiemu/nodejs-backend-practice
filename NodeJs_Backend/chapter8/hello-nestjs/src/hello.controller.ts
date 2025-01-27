import {Controller, Get} from '@nestjs/common'

@Controller()
export class HelloController {
    @Get()
    hello(): string {
        return "Hello :)"
    }
}