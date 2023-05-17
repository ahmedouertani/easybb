import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class InterceptService implements HttpInterceptor {

    constructor(public authService: AuthService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<any> {

        return from(this.authService.getToken()).pipe(
          switchMap(token => {
              const headers = req.headers
                  .set('Authorization', "Bearer "+ token)
                  .append('Content-Type', 'application/json');
              const reqClone = req.clone({
                  headers
              });
              return next.handle(reqClone);
          }));
     }
}