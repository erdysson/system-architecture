import {Selector} from '@ngrx/store';
import {IAppState, INotificationState} from '../interfaces';

export const selectNotifications: Selector<IAppState, INotificationState> = (state: IAppState) => state.notifications;
