import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';

import {Cookie} from '../../decorators/cookie';
import {Roles} from '../../decorators/roles';
import {Role} from '../../enums/role.enum';
import {AuthGuard} from '../../guards/auth.guard';
import {RolesGuard} from '../../guards/roles.guard';
import {SchemaDocument} from '../../interfaces/schema.interface';
import {User} from '../../schemas/user.schema';
import {CacheService} from '../../services/cache.service';
import {UserService} from '../../services/user.service';

@Controller('/api/users')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly cacheService: CacheService, private readonly userService: UserService) {
        //
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles(Role.USER)
    async getUsers(@Cookie('client_id') clientId: string): Promise<SchemaDocument<User>[]> {
        const token = await this.cacheService.getAsync(clientId);
        console.log('access token from client id', token);
        return this.userService.getUsers();
    }

    @Get('/:id')
    getUser(@Param('id') id: string): Promise<SchemaDocument<User>> {
        return this.userService.getUserById(id);
    }

    @Post('/delete')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    deleteUser(@Body() body: {id: string}): Promise<boolean> {
        return this.userService
            .deleteUser(body.id)
            .then(() => true)
            .catch(() => false);
    }

    // todo : fix all return false calls and throw appropriate error
    @Post('/edit')
    editUser(@Body() body: Partial<User>): Promise<boolean> {
        return this.userService
            .editUser(body)
            .then(() => true)
            .catch(() => false);
    }
}
