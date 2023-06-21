import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'add-post',
    loadComponent: () => import('./add-post/add-post.page').then( m => m.AddPostPage)
  },
];
