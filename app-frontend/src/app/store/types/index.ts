import {Action} from '@ngrx/store';

export type IPayload<T> = {payload: T};
export type IAction<T> = Action & IPayload<T>;
