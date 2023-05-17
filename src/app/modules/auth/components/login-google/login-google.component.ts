import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MyErrorStateMatcher } from '../login-v2/login-v2.component';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.scss']
})

export class LoginGoogleComponent implements OnInit {
  login = [
    { id: 1, name: "Sami",  email: "sami@tanitlab.com", password: 123456  },
    { id: 2, name: "Ahmed",  email: "ahmed@test.com", password: 121212  },
    { id: 3, name: "Fatma",  email: "fatma@test.com", password: 987654  },
  ];

  today: Date = new Date();
  hasError: boolean;
  returnUrl: string;
  message: string;
  isLoading$: Observable<boolean>;
  checkUser: any;
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  

  matcher = new MyErrorStateMatcher();
  emailform : any ;
  passwordform : any ;
  hide = true;
  emailCondition:boolean = false;
  passwordCondition:boolean = false;
  hideDivEmail: boolean = false;
  alertExiste:string = 'This email does not exist';
  passwordUserPosition:any; 
  userMail:any;
  userName:any

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private _cdr: ChangeDetectorRef,
    public fs: AngularFirestore,
    private _snackBar: MatSnackBar

  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void {
  
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-body');
  }
  googleAuth() { 
   
    this.hasError = false;
    const provider = new GoogleAuthProvider();
    const app = initializeApp(environment.firebaseConfig);
    const auth = getAuth(app);

    signInWithPopup(auth, provider)
      .then((result) => {        
        this.authService.checkUser(result.user?.uid).pipe(
          take(1),).subscribe((res: any) => {
            this.checkUser = res;        
            if (this.checkUser.length == 0 || (this.checkUser && this.checkUser[0].idDomaine =='' && this.checkUser[0].role == 1)) {
            this.authService.authWithGoogle(result.user)
            localStorage.setItem('adminName',result.user?.displayName);      
            localStorage.setItem('adminUID',result.user?.uid);                  
            }

            else{
              this.router.navigate(['/dataset/folders-list']);
              localStorage.setItem('domaineId', this.checkUser[0].idDomaine);
              localStorage.setItem('photoURL', result.user?.photoURL);

            }
          })
      })
  

  }
 



  
  openSnackBar() {
    this._snackBar.open('Please Contact your admin to create an account !');
  }
}
