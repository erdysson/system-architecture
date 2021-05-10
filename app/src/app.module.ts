import {Module} from '@nestjs/common';

import {AuthController} from './controllers/auth/auth.controller';
import {UserController} from './controllers/user/user.controller';
import {AuthGuard} from './guards/auth.guard';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';

@Module({
    imports: [],
    controllers: [UserController, AuthController],
    providers: [UserService, AuthService, AuthGuard]
})
export class AppModule {}
