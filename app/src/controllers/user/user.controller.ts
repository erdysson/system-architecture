import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';

import {Cookie} from '../../decorators/cookie';
import {AuthGuard} from '../../guards/auth.guard';
import {SchemaDocument} from '../../interfaces/schema.interface';
import {User} from '../../schemas/user.schema';
import {UserService} from '../../services/user.service';

@Controller('/api/users')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {
        //
    }

    @Get()
    getUsers(@Cookie('client_id') clientId: string): Promise<SchemaDocument<User>[]> {
        console.log('client id', clientId);
        return this.userService.getUsers();
    }

    @Get('/:id')
    getUser(@Param('id') id: string): Promise<SchemaDocument<User>> {
        return this.userService.getUserById(id);
    }

    // @Post('/add')
    // addUser(@Body() body: Omit<User, 'id' | 'password'>): Promise<boolean> {
    //     return this.userService
    //         .registerUser(body)
    //         .then(() => true)
    //         .catch(() => false);
    // }

    @Post('/delete')
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
