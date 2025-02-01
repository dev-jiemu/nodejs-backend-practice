import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { NotIn } from '../../common/decorators/not-in';

export class CreateUserDto {
    @Transform(params => params.value.trim()) // 공백 제거
    @NotIn('password', {message: 'password는 name과 같은 문자열을 포함할 수 없습니다.'})
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    readonly name: string

    @IsString()
    @IsEmail()
    @MaxLength(60)
    readonly email: string

    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
    readonly password: string
}