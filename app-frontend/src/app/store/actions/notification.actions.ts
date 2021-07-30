import {createAction, props} from '@ngrx/store';
import {INotification} from '../interfaces';
import {IPayload} from '../types';
import {NotificationActionTypesEnum} from './notification-action-types.enum';

export const NotificationActions = {
  addNotification: createAction(NotificationActionTypesEnum.addNotification, props<IPayload<INotification>>()),
  removeNotification: createAction(NotificationActionTypesEnum.removeNotification, props<IPayload<Pick<INotification, 'id'>>>()),
};
