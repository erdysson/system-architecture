import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenService} from '../services/token.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {switchMap} from 'rxjs/operators';
import {IRefreshTokenResponse} from '../interfaces';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
    private readonly tokenService: TokenService,
    private readonly authService: AuthService
  ) {
    //
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/api/')) {
      const accessToken: string = this.authService.getAccessToken();
      const isAccessTokenExpired: boolean = accessToken ? this.tokenService.isExpired(accessToken) : true;
      const refreshToken: string = this.authService.getRefreshToken();
      const isRefreshTokenExpired: boolean = refreshToken ? this.tokenService.isExpired(refreshToken) : true;

      if (isRefreshTokenExpired) {
        this.authService.requireLogin();
        return next.handle(req);
      } else if (isAccessTokenExpired) {
        return this.authService.refreshToken().pipe(
          switchMap((response: IRefreshTokenResponse) => {
            req = this.setBearerToken(req, response.token);
            return next.handle(req);
          })
        );
      } else {
        req = this.setBearerToken(req, accessToken);
        return next.handle(req);
      }
    } else {
      return next.handle(req);
    }
  }

  private setBearerToken(req: HttpRequest<any>, accessToken: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}
