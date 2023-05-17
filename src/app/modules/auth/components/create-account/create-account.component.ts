import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupInfosComponent } from '../popup-infos/popup-infos.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize, map, Observable } from 'rxjs';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MyErrorStateMatcher } from '../login-v2/login-v2.component';


@Component({
  selector: 'app-creat-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreatAccountComponent implements OnInit {
  login = [
    { id: 1, name: "Sami",  email: "sami@tanitlab.com", password: 123456  },
    { id: 2, name: "Ahmed",  email: "ahmed@test.com", password: 121212  },
    { id: 3, name: "Fatma",  email: "fatma@test.com", password: 987654  },
  ];


  domaineName: any;
  path: any;
  name: string ;
  accountService: any;
  currentUser: any ;
  displayName: string ;

  constructor(private httpBackend: HttpBackend ,private dialog: MatDialog, private storage: AngularFireStorage, private afs: AngularFirestore,private authService: AuthService
   , private http: HttpClient,private router: Router) { }
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  url:any;
  ngOnInit(): void {
    this.displayName = localStorage.getItem("adminName");  
    this.currentUser = localStorage.getItem("adminUID");  
  }

  logoSelected: boolean = false;

  inputFile(fileInputEvent: any) {
    if (fileInputEvent.target.files[0]) {
      this.logoSelected = true;
    } else {
      this.logoSelected = false;
    }
    this.path = fileInputEvent.target.files[0];
  
  }
    

  openDialogCredentInfos() {
    this.dialog.open(PopupInfosComponent, {
    });
  }

  createNameSpace() {
          let idDomaine = uuidv4() ;
          this.afs.collection('domaine_BQDS').doc(idDomaine).set({
            domaineId: idDomaine,
            user_id: this.currentUser,
            domaineName: this.name
          }).then(() => {
          
            this.router.navigate(['/auth/choose-domaine']);
            const data2 = {
              idDomaine: idDomaine
            }
            this.afs.collection('user_BQDS').doc(this.currentUser).set(JSON.parse(JSON.stringify(data2)), { merge: true })  
            localStorage.setItem('domaineId',idDomaine);
   
          })
    
     
  
      
     
  }

  upload(event) {
    this.path = event.target.files[0]
  }

  uploadFile() {
    console.log(this.path)
  }

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



}
