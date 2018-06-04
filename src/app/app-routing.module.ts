import { GlobalsService } from './services/globals.service';
import { AuthResolveService } from './services/auth-resolve.service';
import { AuthGuardService } from './services/auth-guard.service';
import { YourAccountComponent } from './views/your-account/your-account.component';
import { SettingsComponent } from './views/settings/settings.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RemindersComponent } from './views/reminders/reminders.component';

class RoutesClass {
  public routes: Routes;

  constructor(private gs: GlobalsService) {
    this.routes = [
      // replace all strings here with reference from globals service
      {
        path: gs.LANDING_PAGE.STR,
        component: DashboardComponent,
        canActivate: [AuthGuardService],
        // resolve: [AuthResolveService]
      },
      {
        path: gs.REMINDERS_PAGE.STR,
        component: RemindersComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: gs.YOUR_ACCOUNT_PAGE.STR,
        component: YourAccountComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: gs.LOGIN_PAGE.STR,
        component: LoginComponent
      },
      {
        path: gs.SETTINGS_PAGE.STR,
        component: SettingsComponent,
        canActivate: [AuthGuardService],
      }
    ];
  }
}

// const routes: Routes = [
//   // replace all strings here with reference from globals service
//   {
//     path: '',
//     component: DashboardComponent,
//     canActivate: [AuthGuardService],
//     // resolve: [AuthResolveService]
//   },
//   {
//     path: 'reminders',
//     component: RemindersComponent,
//     canActivate: [AuthGuardService],
//   },
//   {
//     path: 'your-account',
//     component: YourAccountComponent,
//     canActivate: [AuthGuardService],
//   },
//   {
//     path: 'login',
//     component: LoginComponent
//   },
//   {
//     path: 'settings',
//     component: SettingsComponent,
//     canActivate: [AuthGuardService],
//   }
// ];

@NgModule({
  imports: [RouterModule.forRoot(new RoutesClass(new GlobalsService()).routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }