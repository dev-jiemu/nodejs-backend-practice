import { Module, Logger } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import {AuthModule} from "../auth/auth.module";
import {CqrsModule} from '@nestjs/cqrs'

@Module({
    imports: [
            EmailModule,
            AuthModule,
            TypeOrmModule.forFeature([UserEntity]),
            CqrsModule,
    ],
    controllers: [UsersController],
    providers: [UsersService, Logger],
})
export class UsersModule {}
