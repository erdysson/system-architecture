import {createSelector, Selector} from '@ngrx/store';
import {IAppState, IAuthState} from '../interfaces';

export const selectAuth: Selector<IAppState, IAuthState> = (state: IAppState) => state.auth;

export const selectAuthState = createSelector(selectAuth, (state: IAuthState) => state);

export const selectIsLoggedIn = createSelector(selectAuthState, (state: IAuthState) => state.isLoggedIn);
