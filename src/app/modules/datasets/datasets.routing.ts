import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountServiceComponent } from './components/account-service/account-service.component';
import { AddDatasetComponent } from './components/add-dataset/add-dataset.component';
import { AddFolderComponent } from './components/add-folder/add-folder.component';
import { ListeDatasetsComponent } from './components/list-dataset/liste-datasets.component';
import { ListTablesComponent } from './components/list-tables/list-tables.component';
import { ListeFoldersComponent } from './components/liste-folders/liste-folders.component';
import { ListeWithSidebarComponent } from './components/liste-with-sidebar/liste-with-sidebar.component';
import { TestComponent } from './components/test/test.component';


const routes: Routes = [
  { path: 'create-dataset', component: AddDatasetComponent  },
  { path: 'table-detail/:folderId/:tableId', component: ListeDatasetsComponent  },
  { path: 'add-folder', component: AddFolderComponent  },
  { path: 'folders-list', component: ListeFoldersComponent},
  { path: 'liste-sidebar', component: ListeWithSidebarComponent},
  { path: 'liste-tables/:folderId', component: ListTablesComponent },
  { path: 'test', component: TestComponent},
  { path: 'manage-account-service', component: AccountServiceComponent},
  { path: '', component: AddDatasetComponent  },

];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

export class datasetRouting { }
