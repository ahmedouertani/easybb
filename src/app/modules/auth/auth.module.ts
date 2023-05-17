import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthRoutingModule } from './auth-routing.module';
import {MatIconModule} from '@angular/material/icon';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChooseDomaineComponent } from './components/choose-domaine/choose-domaine.component';
import { MatButtonModule } from '@angular/material/button';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { SelectAccountComponent } from './components/select-account/select-account.component';
import { CreatAccountComponent } from './components/create-account/create-account.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PopupInfosComponent } from './components/popup-infos/popup-infos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DomaineGuard } from './services/domaine.gard';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { LoginV2Component } from './components/login-v2/login-v2.component';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    SignUpComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    ChangePasswordComponent,
    ChooseDomaineComponent,
    LoginGoogleComponent,
    SelectAccountComponent,
    CreatAccountComponent,
    PopupInfosComponent,
    LoginV2Component,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatIconModule,
    MatButtonModule,
    Ng2SearchPipeModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatInputModule,
    ReactiveFormsModule,
    


  ],
  providers: [ HttpClientModule ,
  DomaineGuard]
})
export class AuthModule { }
