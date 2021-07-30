import {createReducer, on} from '@ngrx/store';
import {NotificationActions} from '../actions/notification.actions';
import {INotification, INotificationState} from '../interfaces';
import {IAction} from '../types';

export const notificationsInitialState: INotificationState = {};

export const notificationReducer = createReducer(
  notificationsInitialState,
  on(NotificationActions.addNotification, (state: INotificationState, action: IAction<INotification>) => {
    const {id, type, text} = action.payload;
    return {...state, [id]: {id, type, text}};
  }),
  on(NotificationActions.removeNotification, (state: INotificationState, action: IAction<Pick<INotification, 'id'>>) => {
    const {id} = action.payload;
    const notifications = {...state};
    delete notifications[id];
    return notifications;
  })
);

export const notificationReducerFactory = (state: INotificationState|undefined, action: IAction<any>) => {
  return notificationReducer(state, action);
};
