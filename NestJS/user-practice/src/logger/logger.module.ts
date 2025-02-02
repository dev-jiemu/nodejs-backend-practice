import { Module, Global } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

// 별도 로거 선언하고 싶으면 모듈로 처리하기
@Global()
@Module({
    imports: [],
    exports: [],
})
export class LoggerModule {}
