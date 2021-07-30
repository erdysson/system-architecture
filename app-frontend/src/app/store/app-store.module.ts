import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {effects, reducers} from './index';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NetworkErrorInterceptor} from './interceptors/network-error.interceptor';
import {LocalStorageService} from './services/local-storage.service';
import {AuthService} from './services/auth.service';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {NotificationService} from './services/notification.service';
import {UserService} from './services/user.service';
import {UserEffects} from './effects/user.effects';
import {TokenService} from './services/token.service';
import {AuthGuard} from './guards/auth.guard';
import {LoginGuard} from './guards/login.guard';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    LocalStorageService,
    TokenService,
    NotificationService,
    AuthService,
    UserEffects,
    UserService,
    AuthGuard,
    LoginGuard
  ]
})
export class AppStoreModule {}
