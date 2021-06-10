import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { routing, appRoutingProviders } from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

import { FormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { UserEditComponent } from './components/user-edit/user-edit.component';

// Import Angular plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
