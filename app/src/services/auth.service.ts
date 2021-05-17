import {Buffer} from 'buffer';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

import {Injectable} from '@nestjs/common';
import {CookieOptions} from 'express';
import * as jwt from 'jsonwebtoken';
import {VerifyErrors} from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private readonly jwtDirectory: string = path.join(process.cwd(), 'config', 'jwt');

    private readonly issuer = 'egoekalp';
    private readonly algorithm = 'RS256';
    private readonly passphrase = 'egoekalp';

    private readonly audience = 'https://localhost';

    private readonly passwordSaltRounds = 12;

    private readonly clientIdTokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day

    public readonly clientIdExpiresIn = '1d';
    public readonly accessTokenExpiresIn = '15m';
    public readonly refreshTokenExpiresIn = '1h';

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

    // eslint-disable-next-line @typescript-eslint/ban-types
    public async signJWT<T extends object>(payload: T, expiresIn: string): Promise<string> {
        const pk = await this.getPrivateKey();
        return jwt.sign(
            payload,
            {
                key: pk,
                passphrase: this.passphrase
            },
            {
                issuer: this.issuer,
                audience: this.audience,
                algorithm: this.algorithm,
                expiresIn
            }
        );
    }

    public decodeJWT<T>(token: string): T {
        return jwt.decode(token, {json: true}) as T;
    }

    public async verifyJWT(token: string): Promise<void> {
        const pk = await this.getPublicKey();
        return new Promise<void>((resolve, reject) => {
            jwt.verify(
                token,
                pk,
                {
                    issuer: this.issuer,
                    audience: this.audience,
                    algorithms: [this.algorithm]
                },
                (error: VerifyErrors | null) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                }
            );
        });
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

    public getCookieOptions(): CookieOptions {
        return {
            httpOnly: true,
            secure: true,
            expires: this.clientIdTokenExpires,
            sameSite: 'strict'
        };
    }
}
