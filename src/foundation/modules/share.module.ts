import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgPipesModule } from 'angular-pipes';
import { TranslateModule } from 'ng2-translate/ng2-translate';

import { ConsolePipe } from '../pipes';
import { TRANSCLUDE_DIRECTIVE, HOST_DIRECTIVE } from '../directives';

@NgModule({
  imports: [
    CommonModule,
    NgPipesModule
  ],
  exports: [
    CommonModule, FormsModule, ReactiveFormsModule, HttpModule, RouterModule,
    TranslateModule, TRANSCLUDE_DIRECTIVE, ConsolePipe, HOST_DIRECTIVE
  ],
  providers: [],
  declarations: [
    TRANSCLUDE_DIRECTIVE, ConsolePipe, HOST_DIRECTIVE
  ]
})
export class ShareModule { }
