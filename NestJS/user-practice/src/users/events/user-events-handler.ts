import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {UserCreatedEvent} from "./user-created-event";
import {TestEvent} from "./test-event";
import {EmailService} from "../../email/email.service";

@EventsHandler(UserCreatedEvent, TestEvent)
export class UserEventsHandler implements IEventHandler<UserCreatedEvent | TestEvent> {
    constructor(private emailService : EmailService) {}

    async handle(event: UserCreatedEvent | TestEvent) {
        if (event instanceof UserCreatedEvent) {
            console.log('UserCreatedEvent')
            const { email, signupVerifyToken } = event
            await this.emailService.sendMemberJoinVerification(email, signupVerifyToken)
        } else if (event instanceof TestEvent) {
            console.log('TestEvent')
        }
    }
}