import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDatasetComponent } from './components/add-dataset/add-dataset.component';
import { datasetRouting } from './datasets.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ListeDatasetsComponent } from './components/list-dataset/liste-datasets.component';
import { AddFolderComponent } from './components/add-folder/add-folder.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ListeFoldersComponent } from './components/liste-folders/liste-folders.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularSplitModule } from 'angular-split';
import { FormsModule} from '@angular/forms';
import { ListeWithSidebarComponent } from './components/liste-with-sidebar/liste-with-sidebar.component';
import { UpdateFolderComponent } from './components/update-folder/update-folder.component';
import { SchemeTableComponent } from './components/scheme-table/scheme-table.component';
import { OverviewTableComponent } from './components/overview-table/overview-table.component';
import { DetailTableComponent } from './components/detail-table/detail-table.component';
import { AddFileComponent } from './components/add-file/add-file.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ListTablesComponent } from './components/list-tables/list-tables.component';
import { AddTabComponent } from './components/add-tab/add-tab.component';
import { TestComponent } from './components/test/test.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgProgressModule } from "ngx-progressbar";
import { NgProgressHttpModule } from "ngx-progressbar/http";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AccountServiceComponent } from './components/account-service/account-service.component';
import { ListFilesComponent } from './components/list-files/list-files.component';
import { FileParamsComponent } from './components/file-params/file-params.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    AddDatasetComponent,
    ListeDatasetsComponent,
    AddFolderComponent,
    ListeFoldersComponent,
    ListeWithSidebarComponent,
    UpdateFolderComponent,
    SchemeTableComponent,
    OverviewTableComponent,
    DetailTableComponent,
    AddFileComponent,
    ListTablesComponent,
    AddTabComponent,
    TestComponent,
    AccountServiceComponent,
    ListFilesComponent,
    FileParamsComponent,


  ],
  imports: [
    CommonModule,
    datasetRouting,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatMenuModule,
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSelectModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatCardModule,
    ReactiveFormsModule,
    AngularSplitModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialFileInputModule,
    MatSnackBarModule,
    NgxPaginationModule,
    NgProgressHttpModule,
    MatProgressSpinnerModule,
    Ng2SearchPipeModule,
    NgxMatSelectSearchModule,
    NgxDropzoneModule,
    MatDialogModule

    ]
})
export class DatasetsModule { }
