import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  declarations: [SideBarComponent],
  exports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    SideBarComponent,
  ]
})
export class SharedModule { }
