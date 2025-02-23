import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetUserInfoQuery} from "./get-user-info.query";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {Repository} from "typeorm";
import {UserInfoDto} from "../dto/user-info.dto";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetUserInfoQuery)
export class GetUserInfoQueryHandler implements IQueryHandler<GetUserInfoQuery> {
    constructor(@InjectRepository(UserEntity) private usersRepository : Repository<UserEntity>) {}

    async execute(query: GetUserInfoQuery): Promise<UserInfoDto> {
        const {userId} = query
        const user = await this.usersRepository.findOne({
            where: {id: userId}
        })

        if (!user) {
            throw new NotFoundException('User does not exist')
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    }
}