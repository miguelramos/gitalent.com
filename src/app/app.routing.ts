import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', loadChildren: './containers/home/home.module#HomeModule' },
    ]
  }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES, {
  useHash: false
});
