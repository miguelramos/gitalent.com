import { NgModule } from '@angular/core';
import { MdToolbarModule } from '@angular/material';

import { ROUTING } from '../app.routes';
import { ShareModule } from '../../foundation';
import { NavigatorModule } from '../components';
import { PlatformContainer } from './platform.container';

export * from './platform.container';

@NgModule({
  imports: [ ROUTING, ShareModule, NavigatorModule.forRoot(), MdToolbarModule ],
  declarations: [ PlatformContainer ],
  exports: [PlatformContainer],
  bootstrap: [PlatformContainer]
})
export class PlatformContainerModule {}
