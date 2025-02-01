import {Request} from 'express'
import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {AuthService} from "../../auth/auth.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate= (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> => {
        const request = context.switchToHttp().getRequest()
        return this.validateRequest(request)
    }

    private validateRequest = (request: Request) : boolean => {
        const auth = request.headers.authorization.split('Bearer ')[1]
        this.authService.verify(auth)

        return true
    }
}