import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    InternalServerErrorException,
    Logger
} from "@nestjs/common";
import { Response, Request } from "express"; // 추가

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private logger: Logger) {}

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const res = ctx.getResponse<Response>()
        const req = ctx.getRequest<Request>()

        if (!(exception instanceof HttpException)) {
            exception = new InternalServerErrorException()
        }

        const response = (exception as HttpException).getResponse()

        const stack = exception.stack

        const log = {
            timestamp: new Date(),
            url: req.url,
            response,
            stack,
        }

        this.logger.log(log)

        res.status((exception as HttpException).getStatus()).json(response)
    }
}