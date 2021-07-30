import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {NotificationActionTypesEnum} from '../actions/notification-action-types.enum';
import {IAppState, INotification, INotificationState} from '../interfaces';
import {selectNotifications} from '../selectors/notification.selector';

@Injectable()
export class NotificationService {

  readonly notifications$: Observable<INotificationState> = this.store$.select(selectNotifications);

  constructor(
    private readonly store$: Store<IAppState>
  ) {}

  addNotification(notification: INotification): void {
    this.store$.dispatch({
      type: NotificationActionTypesEnum.addNotification,
      payload: notification
    });
  }

  removeNotification(id: string): void {
    this.store$.dispatch({
      type: NotificationActionTypesEnum.removeNotification,
      payload: {id}
    });
  }
}
