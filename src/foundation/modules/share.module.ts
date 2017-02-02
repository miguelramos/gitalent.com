import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgPipesModule } from 'angular-pipes';
import { TranslateModule } from 'ng2-translate/ng2-translate';

import { ConsolePipe } from '../pipes';
import { TRANSCLUDE_DIRECTIVE } from '../directives';

@NgModule({
  imports: [
    CommonModule,
    NgPipesModule
  ],
  exports: [
    CommonModule, FormsModule, ReactiveFormsModule, HttpModule,
    TranslateModule, TRANSCLUDE_DIRECTIVE, ConsolePipe
  ],
  providers: [],
  declarations: [
    TRANSCLUDE_DIRECTIVE, ConsolePipe
  ]
})
export class ShareModule { }
