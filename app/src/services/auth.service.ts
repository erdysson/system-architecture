import {Buffer} from 'buffer';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

import {Injectable} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {VerifyErrors} from 'jsonwebtoken';

import {User} from '../schemas/user.schema';

@Injectable()
export class AuthService {
    private readonly jwtDirectory: string = path.join(process.cwd(), 'config', 'jwt');

    private readonly passwordSaltRounds = 12;

    private getPublicKey(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            fs.readFile(
                path.join(this.jwtDirectory, 'public.pem'),
                (err: NodeJS.ErrnoException | null, data: Buffer) => {
                    if (err) {
                        console.trace('Can not read public key', err);
                        reject();
                    } else {
                        resolve(data.toString());
                    }
                }
            );
        });
    }

    private getPrivateKey(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            fs.readFile(
                path.join(this.jwtDirectory, 'private.pem'),
                (err: NodeJS.ErrnoException | null, data: Buffer) => {
                    if (err) {
                        console.trace('Can not read private key', err);
                        reject();
                    } else {
                        resolve(data.toString());
                    }
                }
            );
        });
    }

    public generateToken(payload: Partial<User>, expiresIn: string): Promise<string> {
        return this.getPrivateKey().then((privateKey: string) => {
            return jwt.sign(
                payload,
                {
                    key: privateKey,
                    passphrase: 'egoekalp'
                },
                {
                    issuer: 'egoekalp',
                    audience: 'https://localhost',
                    algorithm: 'RS256',
                    expiresIn
                }
            );
        });
    }

    public validateToken(token: string): Promise<void> {
        return this.getPublicKey().then((publicKey: string) => {
            return new Promise<void>((resolve, reject) => {
                jwt.verify(
                    token,
                    publicKey,
                    {
                        issuer: 'egoekalp',
                        audience: 'https://localhost',
                        algorithms: ['RS256']
                    },
                    (error: VerifyErrors | null) => {
                        if (error) {
                            reject();
                        } else {
                            resolve();
                        }
                    }
                );
            });
        });
    }

    public decodeToken(token: string): Partial<User> {
        return jwt.decode(token, {json: true});
    }

    public generateSalt(): string {
        return crypto
            .randomBytes(Math.ceil(this.passwordSaltRounds / 2))
            .toString('hex')
            .slice(0, this.passwordSaltRounds);
    }

    public generatePassword(passwordStr: string, salt: string): string {
        const hash = crypto.createHmac('sha512', salt);
        hash.update(passwordStr);
        const password = hash.digest('hex');
        return `${salt}:${password}`;
    }

    public validatePassword(passwordStr: string, storedPassword: string): boolean {
        const [salt, password] = storedPassword.split(':');
        const temporaryPassword = this.generatePassword(passwordStr, salt).split(':')[1];
        return temporaryPassword === password;
    }
}
