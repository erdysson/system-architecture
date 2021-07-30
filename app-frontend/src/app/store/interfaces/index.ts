export interface IUserState {
  ids: string[];
  users: Record<string, IUser>;
}

export interface INotification {
  id: string;
  type: string;
  text: string;
}

export interface INotificationState {
  [key: string]: INotification;
}

export interface IAppState {
  user: IUserState;
  notifications: INotificationState;
}

export interface ILoginPayload {
  userName: string;
  password: string;
}

export interface IRegistrationPayload {
  name: string;
  lastName: string;
  // todo : change to enum
  gender: number;
  email: string;
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
  statusCode: number|null;
}

export interface IRegistrationFailurePayload {
  invalidField: string|null;
  message: string|null;
  statusCode: number|null;
}

export interface IRefreshTokenPayload {
  token: string;
}

export interface IRefreshTokenResponse {
  token: string;
}

export interface IUser {
  id: string;
  name: string;
  lastName: string;
  userName: string;
  roles: string[];
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
