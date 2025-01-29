import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
// import { ValidationPipe } from '../pipe/validationPipe';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    // 메서드 마다 직접적으로 커스텀 파이프를 적용하고 싶다면 이렇게
    // async create(@Body(ValidationPipe) dto: CreateUserDto): Promise<void> {
    async create(@Body() dto: CreateUserDto): Promise<void> {
        const { name, email, password } = dto
        await this.usersService.createUser(name, email, password)
    }

    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto) : Promise<string> {
        const { signupVerifyToken } = dto

        return await this.usersService.verifyEmail(signupVerifyToken)
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto) : Promise<string> {
        const {email, password} = dto

        return await this.usersService.login(email, password)
    }

    @Get('/:id')
    async getUserInfo(@Param() userId: string) : Promise<UserInfo> {
        return await this.usersService.getUserInfo(userId)
    }
}
