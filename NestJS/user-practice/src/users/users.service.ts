import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid'
import { EmailService } from '../email/email.service';
import { UserInfo } from './UserInfo';

@Injectable()
export class UsersService {
    constructor(private emailService: EmailService) {}

    createUser = async (name: string, email: string, password: string) : Promise<void> => {
        await this.checkUserExists(email)

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

    private checkUserExists = (email: string)=> {

    }

    private saveUser = (name: string, email: string, password: string, signupVerifyToken: string)=> {

    }

    // 회원가입 후 인증 이메일
    private sendMemberJoinEmail = async (email: string, signupVerifyToken: string) : Promise<void> => {
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken)
    }
}
