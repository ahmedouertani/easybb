import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, first, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { initializeApp } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';


export type UserType = UserModel | undefined;
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  domaineName: any;
  currentUser:any ;

  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }
  user$: any;
  constructor(
    private router: Router,
     private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private http: HttpClient,
    public fs: AngularFirestore,


  ) {

    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.getUserAll().subscribe(list=>
      {

      })
  }

  getUserAll() :Observable<any>{
    return this.afs.collection<any>(`user_BQDS`).valueChanges();
  }

  getUserById(uid:any) {
    return this.http.get(environment.apiUrl+`/get_user_by_id/${uid}`)
      .pipe(map((res: any) => {
         return res
      }))
  }

  // public methods
  login(email: string, password: string): any {
    const app = initializeApp(environment.firebaseConfig);
    const auth = getAuth(app);
    return signInWithEmailAndPassword(auth, email, password)
  }

  checkUser(uid:any): Observable<any>{
    return this.fs.collection('user_BQDS', ref => ref.where('uid','==',uid)).valueChanges();
  }

  authWithGoogle(user:any){
   return this.fs.collection('user_BQDS').doc(user.uid).set({
      photoURL: user.photoURL,
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      role: 1,
      last_connected: user.metadata.lastSignInTime,
      idDomaine: '',
      createdOn: new Date().toISOString().substring(0, 10) + "T00:00:00.000Z"
    }).then(() => {
      let idDomaine = uuidv4() ;
      let nameDom = user.email.substring(user.email.indexOf('@') + 1);
      let test =  nameDom.split('.');
          this.afs.collection('domaine_BQDS').doc(idDomaine).set({
            domaineId: idDomaine,
            user_id: user.uid,
            domaineName: test[0],
          }).then(() => {

            const data2 = {
              idDomaine: idDomaine
            }
            this.afs.collection('user_BQDS').doc(user.uid).set(JSON.parse(JSON.stringify(data2)), { merge: true })
            localStorage.setItem('domaineId',idDomaine);
            localStorage.setItem('NomDomaine',test[0]);
          })

          this.router.navigate(['/dataset/manage-account-service']);
    })
  }

  logout() {
    let auth = getAuth();
    auth.signOut().then((res)=>{

      this.router.navigate(['/auth/login'], {
        queryParams: {},
      });
    })
    localStorage.removeItem('project');
  }

  // need create new user then login
  registration(user: UserModel): any {
    let auth = getAuth();
    return createUserWithEmailAndPassword(auth, user.email, user.password)
  }

  forgotPassword(email: string): Promise<void> {
    const app = initializeApp(environment.firebaseConfig);
    const auth = getAuth(app);
    return sendPasswordResetEmail(auth, email)
  }

  async getCurrentUser() {
    let lsValue
    try {
    const auth = getAuth();
    await onAuthStateChanged(auth, (user: any) => {
         lsValue=  user
         });
      if (!lsValue) {
        return undefined;
      }
      const authData = lsValue;
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  token : string
  getToken() {
    const auth = getAuth();
    let tokenPromise = new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user: any) => {
        if (user) {
         this.token= user.accessToken;
        }

        if (this.token) {
          resolve(this.token);
        }

      });
    });
    return tokenPromise;
  }

  getProject(){
    return this.http.get(API_URL+"/get_namespace")
    .pipe(map((res: any) => {
      return res
    }))
  }

  getProjectById(projectId:any){
    return this.http.get(API_URL+"/get_namespace_by_id/" +projectId)
    .pipe(map((res: any) => {
      return res
    }))
  }

  getAcountServiceInfos(path:any){
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*" ,

      })
    }
    return this.http.get(path, httpOptions )
    .pipe(map((res: any) => {
      return res
    }))
  }

  getNamespaceById(domaineId:any){
    return this.http.get(API_URL+"/get_namespace_by_id/" +domaineId)
    .pipe(map((res: any) => {
      return res
    }))
  }

}
