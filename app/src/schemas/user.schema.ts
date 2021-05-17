import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

import {Gender} from '../enums/gender.enum';
import {Role} from '../enums/role.enum';

@Schema()
export class User {
    @Prop({required: true, unique: true})
    id: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    lastName: string;

    @Prop({required: true})
    gender: Gender;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true, unique: true})
    userName: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    roles: Role[];

    @Prop({required: true})
    createdAt: Date;

    @Prop({required: true})
    modifiedAt: Date;

    @Prop()
    lastLoginAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
