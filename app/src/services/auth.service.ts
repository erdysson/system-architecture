import * as fs from 'fs';
import * as path from 'path';

import {Injectable} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {VerifyErrors} from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private readonly jwtDirectory: string = path.join(process.cwd(), 'config', 'jwt');

    // todo : generate clientId with userId and set as staticToken

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

    public generateToken(payload: any, expiresIn: string): Promise<string> {
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

    public decodeToken(token: string): any {
        return jwt.decode(token, {json: true});
    }
}
