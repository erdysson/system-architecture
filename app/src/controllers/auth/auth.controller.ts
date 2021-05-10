import {
    BadRequestException,
    Body,
    Controller,
    NotFoundException,
    Post,
    Res,
    UnauthorizedException
} from '@nestjs/common';
import {IUser} from '../../interfaces/user.interface';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {ILoginResponse, IRefreshTokenResponse} from '../../interfaces/auth.interface';
import {Response} from 'express';

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    register(@Body() body: IUser): Promise<void> {
        // todo : think about it
        return Promise.resolve();
    }

    @Post('/login')
    login(
        @Body() body: {userName: string; password: string},
        @Res({passthrough: true}) response: Response
    ): Promise<NotFoundException | BadRequestException | ILoginResponse> {
        // todo : set cookie
        return this.userService.getUserByUserName(body.userName, false).then((user: IUser) => {
            if (!user) {
                throw new NotFoundException(
                    {invalidField: 'userName', message: 'username does not exist'},
                    'username does not exist'
                );
            }

            if (user.password !== body.password) {
                throw new BadRequestException(
                    {invalidField: 'password', message: 'password is incorrect'},
                    'password is incorrect'
                );
            }

            return Promise.all([
                this.authService.generateToken({id: user.id}, '1d'),
                this.authService.generateToken({role: user.role}, '15m'),
                this.authService.generateToken({userName: user.userName}, '1h')
            ]).then(([clientId, accessToken, refreshToken]) => {
                response.cookie('client_id', clientId, {
                    httpOnly: true,
                    secure: true,
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24) // 1 day
                });
                return {
                    accessToken,
                    refreshToken
                };
            });
        });
    }

    @Post('/logout')
    logout(@Res() response: Response): boolean {
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
                const decoded: any = this.authService.decodeToken(body.token);
                const userName: string = decoded.userName;
                return this.userService
                    .getUserByUserName(userName)
                    .then((user: Partial<IUser>) => {
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
