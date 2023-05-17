import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeUserComponent } from './components/liste-user/liste-user.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DialogAddUserComponent } from './components/dialog-add-user/dialog-add-user.component';
import { DialogEditUserComponent } from './components/dialog-edit-user/dialog-edit-user.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { InviteUserComponent } from './components/invite-user/invite-user.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularSplitModule } from 'angular-split';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListeUserComponent,
    DialogAddUserComponent,
    DialogEditUserComponent,
    InviteUserComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSelectModule,
    MatExpansionModule,
    MatStepperModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxMatSelectSearchModule,
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
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatCardModule,
    ReactiveFormsModule,
    AngularSplitModule,
    MaterialFileInputModule,
    MatSnackBarModule,
    NgxPaginationModule,

  ]
})
export class UserManagementModule { }
