import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

import {Role} from '../enums/role.enum';

@Schema()
export class User {
    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    lastName: string;

    @Prop()
    userName: string;

    @Prop()
    password: string;

    @Prop()
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
