import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {UiModule} from '../ui/ui.module';

@NgModule({
  imports: [
    UiModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: []
})
export class DashboardModule {}
