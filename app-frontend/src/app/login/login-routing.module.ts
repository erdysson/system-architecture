import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {AppStoreModule} from '../store/app-store.module';
import {UiModule} from '../ui/ui.module';
import {LoginGuard} from '../store/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [
    UiModule,
    FormsModule,
    AppStoreModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginRoutingModule {}
