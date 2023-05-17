import { Injectable, NgZone } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  currentUser: any ;

  constructor(private authService: AuthService,public ngZone: NgZone,) {
    this.currentUser = this.authService.getCurrentUser() ;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user: any) => {
        if (user) {
           resolve(true);   
        } else {
          this.ngZone.run(async () => {
            window.location.assign('/auth/login-with-google');
          });
         // this.authService.logout();

          resolve(false);
        }
      });

    })
  //  console.log(this.currentUser.uid);
   
  //   if(this.currentUser.uid){
  //     const user :any = this.authService.getCurrentUser() ;  
  //      if (user && user.emailVerified) {
  //       return true;
  //   }
  //     // logged in so return true
    
  //   }

  //   // not logged in so redirect to login page with the return url
  //   this.authService.logout();
  //   return false;
  }
}
