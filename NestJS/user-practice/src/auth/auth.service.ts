import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";

interface User {
    id: string
    name: string
    email: string
}

// NestJs.JwtService 사용을 더 권장한다나...ㅇㅂㅇ...?
@Injectable()
export class AuthService {
    constructor(
            private configService: ConfigService,
            private jwtService: JwtService,
    ) {
    }

    login = (user: User) => {
        const payload = {...user}

        // JwtService를 사용하여 JWT 생성
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('auth.jwtSecret'),
            expiresIn: '1d', // 기본 만료 시간 설정
            audience: 'example.com',
            issuer: 'example.com',
        })
    }

    verify = (auth: string) => {
        try {
            const payload = this.jwtService.verify(auth)
            const { id, email } = payload

            return {
                userId: id,
                email,
            }
        } catch (e) {
            console.error('auth.verify error : ', e)
            throw new UnauthorizedException()
        }
    }
}