import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Request} from 'express';

import {User} from '../schemas/user.schema';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const clientId: string = request.cookies['client_id'];

        if (!clientId) {
            throw new UnauthorizedException({message: 'no session found'});
        }
        // verify client id
        try {
            await this.authService.verifyJWT(clientId);
        } catch (e) {
            throw new UnauthorizedException({message: 'client session is invalid'});
        }

        const decrypted: Pick<User, 'id'> = this.authService.decodeJWT(clientId);
        const user = await this.userService.getUserById(decrypted.id);

        if (!user) {
            throw new UnauthorizedException({message: 'client session is invalid'});
        } else {
            return true;
        }
    }
}
