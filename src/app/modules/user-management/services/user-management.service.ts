import { HttpClient , HttpBackend} from '@angular/common/http';
import { Injectable , EventEmitter} from '@angular/core';
import { BehaviorSubject, of, Subject , observable, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class userManagementService {
private subject = new BehaviorSubject<string>('reload');
castReload = this.subject.asObservable();

private httpClient: HttpClient;
  constructor(private http : HttpClient , private handler: HttpBackend) { 

    this.httpClient = new HttpClient(handler);
  }

  getAllUsers(domaineId ){
    return  this.http.get(environment.apiUrl+'/list_users/'+domaineId)
     .pipe(catchError((err)=>of(err)))    
   }

   inviteUser(domaineId , user ){
    return this.http.post(environment.apiUrl+'/invite_user/'+domaineId , user)
     .pipe(catchError((err)=>of(err)))    
   }

   deleteUser(domaineId, userId){ 
    return  this.http.delete(environment.apiUrl+'/delete_user/'+domaineId +'/' + userId)
     .pipe(catchError((err)=>of(err)))
     
   }
  
   updateUser(domaineId, userId, data){ 
    return  this.http.put(environment.apiUrl+'/update_user/'+domaineId +'/' + userId, data)
     .pipe(catchError((err)=>of(err)))  
   }
 
}
