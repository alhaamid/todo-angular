import { AuthResolveService } from './services/auth-resolve.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { GlobalsService } from './services/globals.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { MenuComponent } from './views/menu/menu.component';
import { SettingsComponent } from './views/settings/settings.component';
import { RemindersComponent } from './views/reminders/reminders.component';
import { YourAccountComponent } from './views/your-account/your-account.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NotesService } from './services/notes.service';
import { NotesResolveService } from './services/notes-resolve.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FocusDirective } from './directives/chooseFocus';
import { TestingBackendService } from './services/testing-backend.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MenuComponent,
    SettingsComponent,
    RemindersComponent,
    YourAccountComponent,
    FocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // for ngModel stuff
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}), // disabled warning of using ngModel and formControlName together.
    AngularFireModule.initializeApp(environment.firebase, 'app-name-in-module.ts'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    HttpClientModule
  ],
  exports: [
    FocusDirective
  ],
  providers: [
    GlobalsService, AuthService, AuthGuardService, AuthResolveService, NotesService, NotesResolveService, TestingBackendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
