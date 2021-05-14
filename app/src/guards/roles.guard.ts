import {
    CanActivate,
    ExecutionContext,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Request} from 'express';

import {Role} from '../enums/role.enum';
import {User} from '../schemas/user.schema';
import {AuthService} from '../services/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());

        let decodedAccessToken: Partial<User>;
        let hasAccess: boolean;

        try {
            const accessToken: string = request.header('Authorization').replace('Bearer ', '');
            decodedAccessToken = this.authService.decodeToken(accessToken);
            hasAccess = roles.indexOf(decodedAccessToken.role) > -1;
        } catch (e) {
            throw new InternalServerErrorException({message: 'cannot check authorization level'});
        }

        if (hasAccess) {
            return true;
        } else {
            throw new UnauthorizedException({message: 'not authorized to access this resource'});
        }
    }
}
