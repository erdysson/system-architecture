import {IAuthState, ILoginFailurePayload, ILoginSuccessPayload} from '../interfaces';
import {IAction} from '../types';
import {createReducer, on} from '@ngrx/store';
import {AuthActions} from '../actions/auth.action';

export const authInitialState: IAuthState = {
  isLoggedIn: false,
  invalidField: null,
  message: null
};

export const authReducer = createReducer(
  authInitialState,
  on(AuthActions.logInSuccess, (state: IAuthState, action: IAction<ILoginSuccessPayload>) => {
    return {...state, isLoggedIn: true};
  }),
  on(AuthActions.logInFailure, (state: IAuthState, action: IAction<ILoginFailurePayload>) => {
    const {invalidField, message} = action.payload;
    return {...state, invalidField, message};
  })
);

export const authReducerFactory = (state: IAuthState|undefined, action: IAction<any>) => {
  return authReducer(state, action);
};
