import {Type} from '@angular/core';
import {ActionReducerMap} from '@ngrx/store';
import {IAppState} from './interfaces';
import {notificationReducerFactory} from './reducers/notification.reducer';
import {IAction} from './types';
import {userReducerFactory} from './reducers/user.reducer';
import {UserEffects} from './effects/user.effects';

export const reducers: ActionReducerMap<IAppState, IAction<any>> = {
  user: userReducerFactory,
  notifications: notificationReducerFactory,
};

export const effects: Array<Type<any>> = [
  UserEffects
];
