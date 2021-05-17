import {User} from '../schemas/user.schema';

export type RegUser = Pick<User, 'name' | 'lastName' | 'gender' | 'email' | 'userName' | 'password'>;

export type LoginUser = Pick<User, 'userName' | 'password'>;

export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IRefreshTokenRequest {
    token: string;
}

export interface IRefreshTokenResponse {
    token: string;
}
