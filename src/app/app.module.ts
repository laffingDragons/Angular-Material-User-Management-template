import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule, MatFormFieldModule, MatCardModule, MatProgressBarModule} from '@angular/material';


import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { SigninComponent } from "./user/signin/signin.component";
import { HomeComponent } from './home/home.component';
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressBarModule,
    RouterModule.forRoot([
      { path: 'sign-in', component: SigninComponent, pathMatch: 'full' },
      { path: 'home', component:HomeComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', component: SigninComponent }
    ]),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
