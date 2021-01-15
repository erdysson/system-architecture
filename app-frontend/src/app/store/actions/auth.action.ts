import {createAction, props} from '@ngrx/store';
import {AuthActionTypes} from './auth_action_types.enum';
import {IPayload} from '../types';
import {ILoginFailurePayload, ILoginPayload, ILoginSuccessPayload} from '../interfaces';

export const AuthActions = {
  logIn: createAction(AuthActionTypes.LogIn, props<IPayload<ILoginPayload>>()),
  logInSuccess: createAction(AuthActionTypes.LogInSuccess, props<IPayload<ILoginSuccessPayload>>()),
  logInFailure: createAction(AuthActionTypes.LogInFailure, props<IPayload<ILoginFailurePayload>>())
};
