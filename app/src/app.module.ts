import {Module} from '@nestjs/common';
import {UserController} from './controllers/user/user.controller';
import {UserService} from './services/user.service';
import {AuthController} from './controllers/auth/auth.controller';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';

@Module({
  imports: [],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, AuthGuard],
})
export class AppModule {}
