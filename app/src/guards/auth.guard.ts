import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {Request} from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService
    ) {
        //
    }

    canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        try {
            const accessToken: string = request.header('Authorization').replace('Bearer ', '');
            return this.authService.validateToken(accessToken)
                .then(() => {
                    return true;
                })
                .catch(() => {
                    throw new UnauthorizedException({message: 'token is invalid'});
                });
        } catch (e) {
            throw new UnauthorizedException({message: 'token is invalid'});
        }
    }
}
