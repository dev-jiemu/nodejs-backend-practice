import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import * as uuid from 'uuid'
import { EmailService } from '../email/email.service';
import { UserInfoDto } from './dto/user-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
    constructor(
            private emailService: EmailService,
            private authService: AuthService,
            @InjectRepository(UserEntity) private usersRepository : Repository<UserEntity>,
    ) {}

    createUser = async (name: string, email: string, password: string) : Promise<void> => {
        const user = await this.checkUserExists(email)
        if (user) {
            throw new UnprocessableEntityException('이미 가입된 이메일 입니다')
        }

        const signupVerifyToken = uuid.v1()

        await this.saveUser(name, email, password, signupVerifyToken)
        await this.sendMemberJoinEmail(email, signupVerifyToken)
    }

    verifyEmail = async (signupVerifyToken: string) : Promise<string> => {
        const user = await this.usersRepository.findOne({where: {signupVerifyToken}})
        if (!user) {
            throw new NotFoundException('유저가 존재하지 않습니다')
        }

        return this.authService.login({
            id: user.id,
            name: user.name,
            email: user.email,
        })
    }

    login = async (email: string, password: string) : Promise<string> => {
        const user = await this.usersRepository.findOne({where: {email, password}})

        if (!user) {
            throw new NotFoundException('유저가 존재하지 않습니다')
        }

        return this.authService.login({
            id: user.id,
            name: user.name,
            email: user.email,
        })
    }

    getUserInfo = async (userId: string) : Promise<UserInfoDto> => {
        const user = await this.usersRepository.findOne({where: {id: userId}})
        if (!user) {
            throw new NotFoundException('유저가 존재하지 않습니다.')
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    }

    private checkUserExists = async (email: string)=> {
        const user = await this.usersRepository.findOne({
            where: {email: email}
        })

        return user !== null
    }

    private saveUser = async (name: string, email: string, password: string, signupVerifyToken: string)=> {
        const user = new UserEntity()
        user.id = ulid()
        user.name = name
        user.email = email
        user.password = password
        user.signupVerifyToken = signupVerifyToken

        await this.usersRepository.save(user)
    }

    // 회원가입 후 인증 이메일
    private sendMemberJoinEmail = async (email: string, signupVerifyToken: string) : Promise<void> => {
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken)
    }
}
