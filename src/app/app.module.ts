import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { environment } from 'src/environments/environment';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterial } from './app.material.module';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    LoginComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AppMaterial
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
