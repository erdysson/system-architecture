import {IUser, IUserState} from '../interfaces';
import {createReducer, on} from '@ngrx/store';
import {UserActions} from '../actions/user.action';
import {IAction} from '../types';

export const userInitialState: IUserState = {
  ids: [],
  users: {}
};

export const userReducer = createReducer(
  userInitialState,
  on(UserActions.getUsersSuccess, (state: IUserState, action: IAction<IUser[]>) => {
    const ids: string[] = [];
    const users: Record<string, IUser> = {};
    action.payload.forEach((user: IUser) => {
      const mayBeIndex: number = state.ids.indexOf(user.id);
      if (mayBeIndex === -1) {
        ids.push(user.id);
        users[user.id] = user;
      } else {
        ids.push(state.ids[mayBeIndex]);
        const mayBeUser: IUser = state.users[user.id];
        users[user.id] = Object.assign({}, mayBeUser, user);
      }
    });
    return {ids, users};
  })
);

export const userReducerFactory = (state: IUserState|undefined, action: IAction<any>) => {
  return userReducer(state, action);
};
