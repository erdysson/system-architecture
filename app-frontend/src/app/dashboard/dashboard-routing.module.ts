import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {AppStoreModule} from '../store/app-store.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthGuard} from '../store/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AppStoreModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardRoutingModule {}
