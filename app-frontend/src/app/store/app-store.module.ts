import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {effects, reducers} from './effects';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorageService} from './services/local-storage.service';
import {AuthEffects} from './effects/auth.effects';
import {AuthService} from './services/auth.service';

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
    LocalStorageService,
    AuthService,
    AuthEffects
  ]
})
export class AppStoreModule {}
