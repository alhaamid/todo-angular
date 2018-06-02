import { GlobalsService } from './services/globals.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { MenuComponent } from './views/menu/menu.component';
import { SettingsComponent } from './views/settings/settings.component';
import { SharedComponent } from './views/shared/shared.component';
import { RemindersComponent } from './views/reminders/reminders.component';
import { YourAccountComponent } from './views/your-account/your-account.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MenuComponent,
    SettingsComponent,
    SharedComponent,
    RemindersComponent,
    YourAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GlobalsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
