import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';

import {Cookie} from '../../decorators/cookie';
import {Roles} from '../../decorators/roles';
import {Role} from '../../enums/role.enum';
import {RolesGuard} from '../../guards/roles.guard';
import {RegUser} from '../../interfaces/auth.interface';
import {SchemaDocument} from '../../interfaces/schema.interface';
import {User} from '../../schemas/user.schema';
import {AuthService} from '../../services/auth.service';
import {CacheService} from '../../services/cache.service';
import {UserService} from '../../services/user.service';

@Controller('/api/users')
@UseGuards(RolesGuard)
export class UserController {
    constructor(
        private readonly cacheService: CacheService,
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {
        //
    }

    @Get('/currentUser')
    async currentUser(@Cookie('client_id') clientId: string): Promise<Omit<User, 'password'>> {
        const decoded: Pick<User, 'id'> = await this.authService.decodeJWT(clientId);
        return this.userService.getUserById(decoded.id);
    }

    @Get()
    @UseGuards(RolesGuard)
    getUsers(): Promise<SchemaDocument<User>[]> {
        return this.userService.getUsers();
    }

    @Get('/:id')
    getUser(@Param('id') id: string): Promise<SchemaDocument<User>> {
        return this.userService.getUserById(id);
    }

    @Post('/delete')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    deleteUser(@Body() body: Pick<User, 'id'>): Promise<boolean> {
        return this.userService
            .deleteUser(body.id)
            .then(() => true)
            .catch(() => false);
    }

    @Post('/edit')
    editUser(@Body() body: Partial<RegUser>): Promise<boolean> {
        return this.userService
            .editUser(body)
            .then(() => true)
            .catch(() => false);
    }
}
