import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShareModule { }
