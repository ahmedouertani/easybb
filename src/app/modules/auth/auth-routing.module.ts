import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChooseDomaineComponent } from './components/choose-domaine/choose-domaine.component';
import { CreatAccountComponent } from './components/create-account/create-account.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { LoginV2Component } from './components/login-v2/login-v2.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SelectAccountComponent } from './components/select-account/select-account.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DomaineGuard } from './services/domaine.gard';

const routes: Routes = [
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'choose-domaine', component: ChooseDomaineComponent},
  { path: 'login-with-google', component: LoginGoogleComponent },
  { path: 'select-account', component: SelectAccountComponent },
  { path: 'create-domaine', component: CreatAccountComponent},
  { path: 'login', component: LoginV2Component},
  { path: '**', component: NotFoundComponent },
  { path: '', redirectTo: '/login-with-google', pathMatch: 'full' },
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

export class AuthRoutingModule { }