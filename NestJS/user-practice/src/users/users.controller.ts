import {Body, Controller, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfoDto } from './dto/user-info.dto';
import {AuthService} from "../auth/auth.service";
import {AuthGuard} from "../common/guards/auth-guard";
// import { Validation } from '../pipe/validationPipe';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) {}

    @Post()
    // 메서드 마다 직접적으로 커스텀 파이프를 적용하고 싶다면 이렇게
    // async create(@Body(Validation) dto: CreateUserDto): Promise<void> {
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

    @UseGuards(AuthGuard)
    @Get('/:id')
    async getUserInfo(@Param('id') userId: string) : Promise<UserInfoDto> {
        return await this.usersService.getUserInfo(userId)
    }
}
