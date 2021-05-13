import * as path from 'path';

import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';

import {AuthController} from './controllers/auth/auth.controller';
import {UserController} from './controllers/user/user.controller';
import {AuthGuard} from './guards/auth.guard';
import {User, UserSchema} from './schemas/user.schema';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';

export const nodeEnv = process.env.NODE_ENV || 'development';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: path.join(process.cwd(), `env/.${nodeEnv}.env`)
        }),
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
        MongooseModule.forRoot(process.env.MONGODB_URL)
    ],
    controllers: [AuthController, UserController],
    providers: [AuthService, AuthGuard, UserService]
})
export class AppModule {}
