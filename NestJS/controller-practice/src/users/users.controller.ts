import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    HttpCode,
    BadRequestException,
    Header, Redirect, Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { type UserInfo } from './interfaces/user-info';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('/temp')
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get('/temp')
    findAll(@Res() res) {
        const users = this.usersService.findAll();
        return res.status(200).send(users); // 응답객체 수동 처리
    }

    // 응답 객체에 커스텀 헤더 설정 가능
    @Header('Custom', 'Test Header')
    // 리디렉션이 필요하면
    @Redirect('https://nestjs.com', 301)
    @Get('/temp/:id')
    findOne(@Param('id') id: string) {
        if (+id < 1) {
            throw new BadRequestException('id는 0보다 큰 값이여야 합니다');
        }

        return this.usersService.findOne(+id);
    }

    @HttpCode(202) // Res 객체 변경하는 방법 말고 데커레이터로도 변경 가능
    @Patch('/temp/:id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete('/temp/:id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    @Get('/temp/redirect/docs')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return { url: 'https://docs.nestjs.com/v5' };
        }
    }

    // 라우터 매게변수 받는법
    // 1. @Param() params: {[key: string]: string} 어차피 다 스트링으로 들어올거니까 이렇게 한번에 받거나
    // 2. 일일히 지정하거나
    @Delete('/temp/:userId/memo/:memoId')
    //deleteUserMemo(@Param('userId') userId: string, @Param('memoId') memoId: string)
    deleteUserMemo(@Param() params: {[key: string]: string}) {
        return `userId: ${params.userId}, memoId: ${params.memoId}`
    }

    // ======================
    @Post()
    async CreateUser(@Body() dto: CreateUserDto) : Promise<void> {
        console.log(dto)
    }

    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto) : Promise<string> {
        console.log(dto)
        return
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto) : Promise<UserInfo> {
        console.log(dto)
        return
    }

}
