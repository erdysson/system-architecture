import {
    BadRequestException,
    Body,
    Controller,
    NotFoundException,
    Post,
    Res,
    UnauthorizedException
} from '@nestjs/common';
import {Response} from 'express';
import * as uuid from 'uuid';

import {Role} from '../../enums/role.enum';
import {ILoginResponse, IRefreshTokenResponse} from '../../interfaces/auth.interface';
import {SchemaDocument} from '../../interfaces/schema.interface';
import {User} from '../../schemas/user.schema';
import {AuthService} from '../../services/auth.service';
import {CacheService} from '../../services/cache.service';
import {UserService} from '../../services/user.service';

@Controller('/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly cacheService: CacheService
    ) {}

    @Post('/register')
    register(@Body() body: Omit<User, 'id' | 'role'>): Promise<void> {
        const password = this.authService.generatePassword(body.password, this.authService.generateSalt());
        const id = uuid.v4();
        return this.userService.registerUser({...body, id, password, role: Role.USER});
    }

    @Post('/login')
    login(
        @Body() body: Pick<User, 'userName' | 'password'>,
        @Res({passthrough: true}) response: Response
    ): Promise<NotFoundException | BadRequestException | ILoginResponse> {
        return this.userService.getUserByUserName(body.userName, true).then((user: SchemaDocument<User>) => {
            if (!user) {
                throw new NotFoundException(
                    {invalidField: 'userName', message: 'username does not exist'},
                    'username does not exist'
                );
            }

            if (!this.authService.validatePassword(body.password, user.password)) {
                throw new BadRequestException(
                    {invalidField: 'password', message: 'password is incorrect'},
                    'password is incorrect'
                );
            }

            return Promise.all([
                this.authService.generateToken({id: user.id}, '1d'),
                this.authService.generateToken({role: user.role}, '15m'),
                this.authService.generateToken({userName: user.userName}, '1h')
            ]).then(async ([clientId, accessToken, refreshToken]) => {
                response.cookie('client_id', clientId, {
                    httpOnly: true,
                    secure: true,
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24) // 1 day
                });
                await this.cacheService.setAsync(clientId, accessToken);
                return {
                    accessToken,
                    refreshToken
                };
            });
        });
    }

    @Post('/logout')
    logout(@Res({passthrough: true}) response: Response): boolean {
        try {
            response.cookie('client_id', '');
            return true;
        } catch (e) {
            console.log('can not logout user', e);
            return false;
        }
    }

    @Post('/refreshToken')
    refreshToken(@Body() body: {token: string}): Promise<UnauthorizedException | IRefreshTokenResponse> {
        return this.authService
            .validateToken(body.token)
            .then(() => {
                const decoded = this.authService.decodeToken(body.token);
                const userName: string = decoded.userName;
                return this.userService
                    .getUserByUserName(userName)
                    .then((user: SchemaDocument<User>) => {
                        return this.authService.generateToken({role: user.role}, '15m').then((token: string) => {
                            return {
                                token
                            };
                        });
                    })
                    .catch(() => {
                        throw new UnauthorizedException('username is invalid');
                    });
            })
            .catch(() => {
                throw new UnauthorizedException('token is invalid');
            });
    }
}
