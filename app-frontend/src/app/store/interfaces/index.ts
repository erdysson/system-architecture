export interface IUserState {
  ids: string[];
  users: Record<string, IUser>;
}

export interface IAppState {
  user: IUserState;
}

export interface ILoginPayload {
  userName: string;
  password: string;
}

export interface ILoginSuccessPayload {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginFailurePayload {
  invalidField: string|null;
  message: string|null;
  statusCode: number|null
}

export interface IRefreshTokenPayload {
  token: string;
}

export interface IUser {
  id: string;
  name: string;
  lastName: string;
  userName: string;
  role: string;
}

export interface IApiError {
  message: string;
  statusCode: number;
}

export interface IGetUserPayload {
  id: string;
}

export interface IDeleteUserPayload {
  id: string;
}
