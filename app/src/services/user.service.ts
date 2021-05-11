import * as fs from 'fs';
import * as path from 'path';

import {Injectable} from '@nestjs/common';

import {IUser} from '../interfaces/user.interface';

import ErrnoException = NodeJS.ErrnoException;

@Injectable()
export class UserService {
    private readonly usersJsonDirectory: string = path.join(process.cwd(), 'data', 'users.json');

    private readonly filteredFields: Array<keyof IUser> = ['password'];

    private readUsers(): Promise<IUser[]> {
        return new Promise<IUser[]>((resolve, reject) => {
            fs.readFile(this.usersJsonDirectory, {encoding: 'utf8'}, (err: ErrnoException | null, data: string) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        resolve(JSON.parse(data) as IUser[]);
                    } catch (e) {
                        reject(e);
                    }
                }
            });
        });
    }

    private writeUsers(users: IUser[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                fs.writeFile(
                    this.usersJsonDirectory,
                    JSON.stringify(users),
                    {encoding: 'utf8'},
                    (err: ErrnoException | null) => {
                        if (err) {
                            console.trace('Failed to write users due to', err);
                            reject();
                        } else {
                            resolve();
                        }
                    }
                );
            } catch (e) {
                console.trace('Failed to write users due to', e);
                resolve();
            }
        });
    }

    public filterFields(user: IUser | Partial<IUser>): Partial<IUser> {
        this.filteredFields.forEach((field: keyof IUser) => {
            delete user[field];
        });
        return user;
    }

    public getUsers(filterFields = true): Promise<Array<Partial<IUser>>> {
        return this.readUsers().then((users: IUser[]) => {
            if (!filterFields) {
                return users;
            }
            return users.map((user: IUser) => this.filterFields(user));
        });
    }

    public getUserById(id: string, filterFields = true): Promise<Partial<IUser>> {
        return this.getUsers().then((users: Array<Partial<IUser>>) => {
            const mayBeUser: Partial<IUser> = users.find((user: Partial<IUser>) => user.id === id);
            if (!mayBeUser) {
                return null;
            }
            if (!filterFields) {
                return mayBeUser;
            }
            return this.filterFields(mayBeUser);
        });
    }

    public getUserByUserName(userName: string, filterFields = true): Promise<Partial<IUser>> {
        return this.getUsers(false).then((users: Array<Partial<IUser>>) => {
            const mayBeUser: Partial<IUser> = users.find((user: Partial<IUser>) => user.userName === userName);
            if (!mayBeUser) {
                return null;
            }
            if (!filterFields) {
                return mayBeUser;
            }
            return this.filterFields(mayBeUser);
        });
    }

    public addUser(user: IUser): Promise<void> {
        return this.readUsers().then((users: IUser[]) => {
            const maybeExistingUserWithIdOrUserName: IUser | null = users.find(
                (eUser: IUser) => eUser.id === user.id || eUser.userName === user.userName
            );
            if (maybeExistingUserWithIdOrUserName) {
                console.trace(
                    'User with id',
                    user.id,
                    'or with userName',
                    user.userName,
                    'already exists',
                    maybeExistingUserWithIdOrUserName
                );
                return Promise.reject();
            } else {
                users.push(user);
                return this.writeUsers(users);
            }
        });
    }

    public deleteUser(id: string): Promise<void> {
        return this.readUsers().then((users: IUser[]) => {
            const restOfUsers: IUser[] = users.filter((user: IUser) => user.id !== id);
            return this.writeUsers(restOfUsers);
        });
    }

    public editUser(user: Partial<IUser>): Promise<void> {
        return this.readUsers().then((users: IUser[]) => {
            for (const eUser of users) {
                if (eUser.id === user.id) {
                    user = Object.assign({}, eUser, user);
                    break;
                }
            }
            return this.writeUsers(users);
        });
    }
}
