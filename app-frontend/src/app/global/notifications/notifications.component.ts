import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {INotification} from '../../store/interfaces';
import {NotificationService} from '../../store/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: [
    './notifications.component.scss'
  ]
})
export class NotificationsComponent {

  readonly notificationStack$: Observable<INotification[]> = this.notificationService.notifications$.pipe(
    map((n) => Object.keys(n).map((k) => n[k]))
  );

  constructor(private readonly notificationService: NotificationService) {}
}
