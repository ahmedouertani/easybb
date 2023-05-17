import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { NavbarComponent } from './navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderNotificationComponent } from './header-notification/header-notification.component';
import { NavbarV2Component } from './navbar-v2/navbar-v2.component';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from '../routing';
import { MenuV2Component } from './menu-v2/menu-v2.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';

const routes: Routes = [
  {
    path: '', component:NavbarComponent,
    children: Routing,
  }
];
@NgModule({
  declarations: [
    NavbarComponent,
    HeaderNotificationComponent,
    NavbarV2Component,
    MenuV2Component

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialFileInputModule,

  ]
})
export class LayouttModule { }
