import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardRoutingModule {}
