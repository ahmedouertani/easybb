import { Routes } from '@angular/router';

const Routing: Routes = [
    {
        path: 'users',
        loadChildren: () =>
          import('../modules/user-management/user-management.module').then((m) => m.UserManagementModule),
      },
      {
        path: 'dataset',
        loadChildren: () =>
          import('../modules/datasets/datasets.module').then((m) => m.DatasetsModule),
      },
  
  {
    path: '',
    redirectTo: 'dataset/folders-list',
    pathMatch: 'full',
  },
];

export { Routing };
