import Mail = require('nodemailer/lib/mailer')
import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

interface EmailOptions {
    to: string
    subject: string
    html: string
}

@Injectable()
export class EmailService {
    private transporter: Mail

    // constructor(
    //         @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
    // ) {
    //     this.transporter = nodemailer.createTransport({
    //         service: config.service,
    //         auth: {
    //             user: config.auth.user,
    //             pass: config.auth.pass,
    //         },
    //     })
    // }
    // Inject 안쓰고 이렇게 간결하게 표현도 가능함 ㅇㅇ
    constructor(private configService: ConfigService) {
        const config = this.configService.get('email')
        this.transporter = nodemailer.createTransport({
            service: config.service,
            auth: {
                user: config.auth.user,
                pass: config.auth.pass,
            },
        })
    }

    sendMemberJoinVerification = async(emailAddress: string, signupVerifyToken: string) : Promise<void> => {
        const baseUrl = this.configService.get<string>('email.baseUrl')
        const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`

        const mailOptions: EmailOptions = {
            to: emailAddress,
            subject: '가입 인증 메일',
            html: `
                가입확인 버튼을 누르시면 가입 인증이 완료됩니다. <br/>
                <form action="${url}" method="post">
                  <button>가입확인</button>
                </form>
            `
        }

        return await this.transporter.sendMail(mailOptions)
    }
}
