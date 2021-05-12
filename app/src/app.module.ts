import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AuthController} from './controllers/auth/auth.controller';
import {UserController} from './controllers/user/user.controller';
import {AuthGuard} from './guards/auth.guard';
import {User, UserSchema} from './schemas/user.schema';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/system-architecture')
    ],
    controllers: [AuthController, UserController],
    providers: [AuthService, AuthGuard, UserService]
})
export class AppModule {}
