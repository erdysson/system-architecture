import {AuthEffects} from './auth.effects';
import {Type} from '@angular/core';
import {Action, ActionReducerMap} from '@ngrx/store';
import {IAppState} from '../interfaces';
import {authReducerFactory} from '../reducers/auth.reducer';
import {IAction} from '../types';

export const reducers: ActionReducerMap<IAppState, IAction<any>> = {
  auth: authReducerFactory
}

export const effects: Array<Type<any>> = [
  AuthEffects
];
