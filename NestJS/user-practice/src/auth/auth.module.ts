import { Module, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import authConfig from '../config/auth';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule.forFeature(authConfig),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('auth.jwtSecret'),
                signOptions: {
                    expiresIn: configService.get<string>('auth.jwtExpiresIn', '1h'),
                },
            }),
        }),
    ],
    providers: [AuthService, Logger],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
