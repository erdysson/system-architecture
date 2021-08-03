import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {NotificationService} from '../services/notification.service';

@Injectable()
export class NetworkErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly notificationService: NotificationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const status: number = (event as HttpResponse<any>).status;
          if (status >= 400) {
            this.notificationService.addNotification({
              id: Date.now().toString(),
              text: 'Request Failed',
              type: 'error'
            });
          } else {
            console.log('no notification check for response', event);
          }
        }
      })
    );
  }
}
