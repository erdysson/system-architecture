import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent,
    UsersComponent
  ]
})
export class DashboardRoutingModule {}
