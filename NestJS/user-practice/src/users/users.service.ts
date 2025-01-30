import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as uuid from 'uuid'
import { EmailService } from '../email/email.service';
import { UserInfo } from './UserInfo';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';

@Injectable()
export class UsersService {
    constructor(
            private emailService: EmailService,
            @InjectRepository(UserEntity) private usersRepository : Repository<UserEntity>
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
        throw new Error('Method not implemented')
    }

    login = async (email: string, password: string) : Promise<string> => {
        throw new Error('Method not implemented')
    }

    getUserInfo = async (userId: string) : Promise<UserInfo> => {
        throw new Error('Method not implemented')
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
