export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IRefreshTokenResponse {
    token: string;
}
