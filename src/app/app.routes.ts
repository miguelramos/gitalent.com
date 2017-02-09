import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatformContainer } from './containers/platform.container';

const ROUTES: Routes = [
  {
    path: '',
    component: PlatformContainer,
    children: [
      { path: '', loadChildren: './containers/home/index#HomeModule'}
    ]
  }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES, {
  useHash: false
});
