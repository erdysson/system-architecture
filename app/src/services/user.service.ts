import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {SchemaDocument} from '../interfaces/schema.interface';
import {User} from '../schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<SchemaDocument<User>>) {}

    public getUsers(internalUse = false): Promise<SchemaDocument<User>[]> {
        const projection: Partial<Record<keyof SchemaDocument<User>, number>> = internalUse
            ? {}
            : {password: 0, _id: 0};
        return this.userModel.find({}, projection).exec();
    }

    public getUserById(id: string, internalUse = false): Promise<SchemaDocument<User>> {
        const projection: Partial<Record<keyof SchemaDocument<User>, number>> = internalUse
            ? {}
            : {password: 0, _id: 0};
        return this.userModel.findOne({id}, projection).exec();
    }

    public getUserByUserName(userName: string, internalUse = false): Promise<SchemaDocument<User>> {
        const projection: Partial<Record<keyof SchemaDocument<User>, number>> = internalUse
            ? {}
            : {password: 0, _id: 0};
        return this.userModel.findOne({userName}, projection).exec();
    }

    public async registerUser(user: User): Promise<void> {
        try {
            const newUser = new this.userModel(user);
            await newUser.save();
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async deleteUser(id: string): Promise<void> {
        try {
            await this.userModel.deleteOne({id});
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async editUser(user: Partial<Omit<User, 'password'>>): Promise<void> {
        try {
            await this.userModel.updateOne({id: user.id}, user);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
