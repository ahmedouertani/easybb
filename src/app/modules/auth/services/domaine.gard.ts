import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class DomaineGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.auth.user$ && this.auth.user$
           .map(user => !!(user && user.role == 1  && user.idDomaine))
           .do(validated => {
             if (!validated) {
                 console.log(validated);
             this.router.navigate(['/auth/create-domaine']); 
             } 
         }  )
    }
}
