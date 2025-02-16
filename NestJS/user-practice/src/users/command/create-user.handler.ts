import {Injectable} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateUserCommand} from "./create-user.command";
import {UsersService} from "../users.service";

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(private readonly usersService: UsersService) {}

    async execute(command: CreateUserCommand) {
        const {name, email, password} = command

        return await this.usersService.createUser(name, email, password)
    }
}