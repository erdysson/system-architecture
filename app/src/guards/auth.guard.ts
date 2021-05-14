import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Request} from 'express';

import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {
        //
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const clientId: string = request.cookies['client_id'];
        const accessToken: string = request.header('Authorization').replace('Bearer ', '');

        if (!clientId) {
            throw new UnauthorizedException({message: 'no client session is found'});
        }
        // validate client id
        try {
            await this.authService.validateToken(clientId);
        } catch (e) {
            throw new UnauthorizedException({message: 'client session is invalid'});
        }
        // validate access token
        try {
            await this.authService.validateToken(accessToken);
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: 'token is invalid'});
        }
    }
}
