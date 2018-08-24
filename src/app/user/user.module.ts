import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SharedModule } from "./../shared/shared.module";

import {MatInputModule, MatButtonModule, MatFormFieldModule, MatSnackBarModule, MatProgressBarModule,  MatExpansionModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatExpansionModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'sign-up', component: SignupComponent },
    ])

  ],
  declarations: [SigninComponent, SignupComponent]
})
export class UserModule { }
