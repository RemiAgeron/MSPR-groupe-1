import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

import { UserDetailComponent } from '../user-detail/user-detail.component';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('../search/search.page').then((m) => m.SearchPage),
      },
      {
        path: 'message',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'user/:id',
    component: UserDetailComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'add-post',
    loadComponent: () =>
      import('../add-post/add-post.page').then((m) => m.AddPostPage),
  },
];
