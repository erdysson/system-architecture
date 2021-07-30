import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {delay, of, Subject} from 'rxjs';
import {first, takeUntil} from 'rxjs/operators';
import {INotification} from '../../../store/interfaces';
import {NotificationService} from '../../../store/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: [
    './notification.component.scss'
  ]
})
export class NotificationComponent implements AfterViewInit, OnDestroy {
  @Input()
  readonly notification!: INotification;

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly notificationService: NotificationService) {}

  ngAfterViewInit(): void {
    of({}).pipe(
      takeUntil(this.destroy$),
      first(),
      delay(3000)
    ).subscribe(() => this.notificationService.removeNotification(this.notification.id));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
