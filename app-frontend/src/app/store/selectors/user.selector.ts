import {createSelector, Selector} from '@ngrx/store';
import {IAppState, IUserState} from '../interfaces';

export const selectUser: Selector<IAppState, IUserState> = (state: IAppState) => state.user;

export const selectUserState = createSelector(selectUser, (state: IUserState) => state);

export const selectIds = createSelector(selectUserState, (state: IUserState) => state.ids);

export const selectRecord = createSelector(selectUserState, (state: IUserState) => state.users);
