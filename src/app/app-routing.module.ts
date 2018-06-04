import { AuthResolveService } from './services/auth-resolve.service';
import { AuthGuardService } from './services/auth-guard.service';
import { YourAccountComponent } from './views/your-account/your-account.component';
import { SettingsComponent } from './views/settings/settings.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { SharedComponent } from './views/shared/shared.component';
import { RemindersComponent } from './views/reminders/reminders.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    // resolve: [AuthResolveService]
  },
  {
    path: 'shared',
    component: SharedComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'reminders',
    component: RemindersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'your-account',
    component: YourAccountComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
