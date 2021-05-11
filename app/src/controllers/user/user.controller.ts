import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';

import {Cookie} from '../../decorators/cookie';
import {AuthGuard} from '../../guards/auth.guard';
import {IUser} from '../../interfaces/user.interface';
import {UserService} from '../../services/user.service';

@Controller('/api/users')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {
        //
    }

    @Get()
    getUsers(@Cookie('client_id') clientId: string): Promise<Array<Partial<IUser>>> {
        console.log('client id', clientId);
        return this.userService.getUsers();
    }

    @Get('/:id')
    getUser(@Param('id') id: string): Promise<Partial<IUser>> {
        return this.userService.getUserById(id);
    }

    @Post('/add')
    addUser(@Body() body: IUser): Promise<boolean> {
        return this.userService
            .addUser(body)
            .then(() => true)
            .catch(() => false);
    }

    @Post('/delete')
    deleteUser(@Body() body: {id: string}): Promise<boolean> {
        return this.userService
            .deleteUser(body.id)
            .then(() => true)
            .catch(() => false);
    }

    // todo : fix all return false calls and throw appropriate error
    @Post('/edit')
    editUser(@Body() body: Partial<IUser>): Promise<boolean> {
        return this.userService
            .editUser(body)
            .then(() => true)
            .catch(() => false);
    }
}
