import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/content/content-routing.module').then(m => m.ContentRoutingModule)
  }
];
