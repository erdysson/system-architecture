import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Request} from 'express';

import {Role} from '../enums/role.enum';
import {User} from '../schemas/user.schema';
import {AuthService} from '../services/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());

        let accessToken: string;
        // verify access token
        try {
            accessToken = request.header('Authorization').replace('Bearer ', '');
            // verify access token
            await this.authService.verifyJWT(accessToken);
        } catch (e) {
            throw new UnauthorizedException({message: 'token is invalid'});
        }
        // check the access rights
        const decodedAccessToken: Pick<User, 'roles'> = this.authService.decodeJWT(accessToken);
        const hasAccess = !roles || decodedAccessToken.roles.some((role: Role) => roles.indexOf(role) > -1);

        if (hasAccess) {
            return true;
        } else {
            throw new UnauthorizedException({message: 'not authorized to access this resource'});
        }
    }
}
