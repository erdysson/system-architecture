import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {AppStoreModule} from '../store/app-store.module';
import {LoginGuard} from '../store/guards/login.guard';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AppStoreModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginRoutingModule {}
