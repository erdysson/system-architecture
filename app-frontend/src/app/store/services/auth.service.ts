import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {
  IAppState,
  ILoginPayload,
  ILoginSuccessPayload,
  IRefreshTokenPayload,
  IRefreshTokenResponse,
  IRegistrationPayload
} from '../interfaces';
import {LocalStorageService} from './local-storage.service';
import {Router} from '@angular/router';
import {TokenService} from './token.service';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  private readonly apiBase: string = '/auth';

  private readonly accessTokenStorageKey: string = 'auth:accessToken';
  private readonly refreshTokenStorageKey: string = 'auth:refreshToken';

  constructor(
    private readonly router: Router,
    private readonly http$: HttpClient,
    private readonly store$: Store<IAppState>,
    private readonly localStorageService: LocalStorageService,
    private readonly tokenService: TokenService
  ) {
    //
  }

  public isAuthenticated(): boolean {
    const refreshToken: string = this.getRefreshToken();
    // check the token existence
    if (!refreshToken) {
      return false;
    }
    // check the token expiration
    const isRefreshTokenExpired: boolean = this.tokenService.isExpired(refreshToken);
    if (isRefreshTokenExpired) {
      return false;
    }
    // allow the route initialization
    return true;
  }

  public logIn(credentials: ILoginPayload): Observable<ILoginSuccessPayload> {
    return this.http$.post<ILoginSuccessPayload>(`${this.apiBase}/login`, credentials).pipe(
      tap((response: ILoginSuccessPayload) => {
        this.saveAccessToken(response.accessToken);
        this.saveRefreshToken(response.refreshToken);
      })
    );
  }

  public register(regData: IRegistrationPayload): Observable<boolean> {
    return this.http$.post<boolean>(`${this.apiBase}/register`, regData);
  }

  public refreshToken(): Observable<IRefreshTokenResponse> {
    const refreshToken: string = this.getRefreshToken();
    return this.http$.post<IRefreshTokenPayload>(this.apiBase + '/refreshToken', {token: refreshToken}).pipe(
      tap((response: IRefreshTokenPayload) => {
        this.saveAccessToken(response.token);
      })
    );
  }

  public getAccessToken(): string {
    return this.localStorageService.get(this.accessTokenStorageKey);
  }

  public saveAccessToken(token: string): void {
    this.localStorageService.write(this.accessTokenStorageKey, token);
  }

  public deleteAccessToken(): void {
    this.localStorageService.delete(this.accessTokenStorageKey);
  }

  public getRefreshToken(): string {
    return this.localStorageService.get(this.refreshTokenStorageKey);
  }

  public saveRefreshToken(token: string): void {
    this.localStorageService.write(this.refreshTokenStorageKey, token);
  }

  public deleteRefreshToken(): void {
    this.localStorageService.delete(this.refreshTokenStorageKey);
  }

  public requireLogin(): Promise<boolean> {
    this.deleteAccessToken();
    this.deleteRefreshToken();
    return this.router.navigate(['/login']);
  }
}
