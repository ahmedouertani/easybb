import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupInfosComponent } from '../popup-infos/popup-infos.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize as finalizeOperator, map, Observable } from 'rxjs';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-choose-domaine',
  templateUrl: './choose-domaine.component.html',
  styleUrls: ['./choose-domaine.component.scss']
})
export class ChooseDomaineComponent implements OnInit {
  domaineName: any;
  path: any;
  name: string ;
  accountService: any;
  currentUser: any ;
  domaineId: any;

  constructor(private httpBackend: HttpBackend ,private dialog: MatDialog, private storage: AngularFireStorage, private afs: AngularFirestore,private authService: AuthService
   , private http: HttpClient,private router: Router) { }
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  url:any;
  ngOnInit(): void {
    this.domaineName = getAuth().currentUser.email
    this.domaineName = this.domaineName.substring(this.domaineName.indexOf('@') + 1);
    this.currentUser = getAuth().currentUser.uid ;
    this.domaineId = localStorage.getItem("domaineId"); 
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

      const filePath = '/account_service/Account-Service-' + this.domaineName;
      const ref = this.storage.ref(filePath);
      const task = ref.put(this.path);
       this.downloadURL = ref.getDownloadURL();
       this.downloadURL.subscribe((res:any)=>{
        this.url = res;       
        const newHttpClient = new HttpClient(this.httpBackend);
        newHttpClient.get(this.url).subscribe((res)=>{
          this.accountService = res;    
          console.log(this.accountService);
                
          this.afs.collection('domaine_BQDS').doc(this.domaineId).set({
            project_id: this.accountService.project_id,
            token_uri: this.accountService.token_uri,
            type: this.accountService.type,
            private_key_id: this.accountService.private_key_id,
            private_key: this.accountService.private_key,
            client_id: this.accountService.client_id,
            client_email: this.accountService.client_email,
            auth_uri:this.accountService.auth_uri,
            client_x509_cert_url: this.accountService.client_x509_cert_url,
            auth_provider_x509_cert_url: this.accountService.auth_provider_x509_cert_url,
          }).then(() => { 
            this.router.navigate(['/dataset/folders-list']);
          })
    
        })
        
      })
      
     
  }

  upload(event) {
    this.path = event.target.files[0]
  }

  uploadFile() {
    console.log(this.path)
  }

}
