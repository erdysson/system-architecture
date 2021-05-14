import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Request} from 'express';

import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {
        //
    }

    canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        try {
            const accessToken: string = request.header('Authorization').replace('Bearer ', '');
            return this.authService.validateToken(accessToken).then(() => true);
        } catch (e) {
            throw new UnauthorizedException({message: 'token is invalid'});
        }
    }
}
