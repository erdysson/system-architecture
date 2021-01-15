export interface IAuthState {
  isLoggedIn: boolean;
  invalidField: string|null;
  message: string|null;
}

export interface IAppState {
  auth: IAuthState;
}

export interface ILoginPayload {
  userName: string;
  password: string;
}

export interface ILoginSuccessPayload {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
}

export interface ILoginFailurePayload {
  invalidField: string|null;
  message: string|null;
  statusCode: number|null
}
