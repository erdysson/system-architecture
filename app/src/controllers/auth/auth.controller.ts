import {
    BadRequestException,
    Body,
    Controller,
    InternalServerErrorException,
    NotFoundException,
    Post,
    Res,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import {Response} from 'express';
import * as uuid from 'uuid';

import {Role} from '../../enums/role.enum';
import {SessionGuard} from '../../guards/session.guard';
import {
    ILoginResponse,
    IRefreshTokenRequest,
    IRefreshTokenResponse,
    LoginUser,
    RegUser
} from '../../interfaces/auth.interface';
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
    register(@Body() body: RegUser): Promise<void> {
        const saltedPassword = this.authService.generatePassword(body.password, this.authService.generateSalt());
        return this.userService.registerUser({
            ...body,
            id: uuid.v4(),
            password: saltedPassword,
            roles: [Role.USER],
            createdAt: new Date(),
            modifiedAt: new Date()
        });
    }

    @Post('/login')
    async login(
        @Body() body: LoginUser,
        @Res({passthrough: true}) response: Response
    ): Promise<NotFoundException | BadRequestException | ILoginResponse> {
        const user: SchemaDocument<User> = await this.userService.getUserByUserName(body.userName, true);

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

        const {id, roles} = user;

        const [clientId, accessToken, refreshToken] = await Promise.all([
            this.authService.signJWT({id}, this.authService.clientIdExpiresIn),
            this.authService.signJWT({roles}, this.authService.accessTokenExpiresIn),
            this.authService.signJWT({id}, this.authService.refreshTokenExpiresIn)
        ]);

        // todo : integrate redis cache with sessions
        response.cookie('client_id', clientId, this.authService.getCookieOptions());
        return {
            accessToken,
            refreshToken
        };
    }

    @Post('/logout')
    logout(@Res({passthrough: true}) response: Response): boolean {
        try {
            response.cookie('client_id', '', {expires: new Date()});
            // todo : delete session from redis
            return true;
        } catch (e) {
            console.log('can not logout user', e);
            return false;
        }
    }

    @Post('/refreshToken')
    @UseGuards(SessionGuard)
    async refreshToken(@Body() body: IRefreshTokenRequest): Promise<IRefreshTokenResponse | UnauthorizedException> {
        // verify refreshToken
        try {
            await this.authService.verifyJWT(body.token);
        } catch (e) {
            throw new UnauthorizedException({message: 'refresh token is invalid'});
        }
        const decoded: Pick<User, 'id'> = this.authService.decodeJWT(body.token);
        const user: SchemaDocument<User> = await this.userService.getUserById(decoded.id, true);

        try {
            const token = await this.authService.signJWT({roles: user.roles}, this.authService.accessTokenExpiresIn);
            return {
                token
            };
        } catch (e) {
            throw new InternalServerErrorException({message: 'Can not generate token'});
        }
    }
}
