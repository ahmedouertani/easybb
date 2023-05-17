import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from "firebase/auth";
import { ActivatedRoute, Router } from '@angular/router';
import { datasetService } from 'src/app/modules/datasets/services/dataset.services';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AccountServiceComponent } from 'src/app/modules/datasets/components/account-service/account-service.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements  OnInit , OnChanges{
  currentUser: any;
  screenWidth!: number;
  domaineId: any;
  domaineName:any ;
  firstLetter: string ;
  foldersList: any ;
  photoUrl: string ;
  folderId : string
  reload : any ;
  subscription: Subscription;
  nom:any ;
  user$: Observable<any>;
  toDisplay: boolean = false;
  menuN2: boolean = false;
  linkkIsActive: boolean = false;
  role : string ;
  firstName: string ;
  lastName: string;


 public menuDisplay:boolean = false
 public isExpanded: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor( private dialog: MatDialog ,private route:Router , private ds:datasetService , private router: Router , private breakpointObserver: BreakpointObserver , private authService: AuthService,
    public fs: AngularFirestore) {
    this.getScreenSize();
    this.currentUser = getAuth().currentUser;
    this.photoUrl = localStorage.getItem("photoURL");
    this.firstLetter = this.currentUser.displayName.charAt(0).toUpperCase();
    this.domaineId = localStorage.getItem("domaineId");
    this.nom = localStorage.getItem("NomDomaine");
    console.log(this.nom);

    console.log(this.currentUser);
    this.getNameSpaceById();
    this.ds.castReload.subscribe(res=> {this.reload = res
      if(this.reload == true){
        this.foldersList = [];
        this.ds.getListeFolders(this.domaineId).subscribe((res)=>{
          this.foldersList= res
        })
      }
    });

    this.ds.getListeFolders(this.domaineId).pipe(delay(1000)).subscribe((res)=>{
      this.foldersList= res
    })  }
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
          this.screenWidth = window.innerWidth;
          // console.log(this.screenWidth);
          if(this.screenWidth <= 959){
            this.isExpanded = true;
          }else{
            this.isExpanded = false;
          }
  }
  ngOnInit(): void {
    // console.log('eeee');
    // this.getActiveMenu();

  }

  ngOnChanges(){
    this.test()
  }

  logout(){
    this.authService.logout()
   }

   getNameSpaceById(){
    this.authService.getNamespaceById(this.domaineId).subscribe((res:any)=>{
      this.domaineName = res
    })
   }

   goTo(){
    this.router.navigateByUrl('users/liste-user');
   }

   getFoldersList(){
    this.ds.getListeFolders(this.domaineId).pipe(delay(1000)).subscribe((res)=>{
      this.foldersList= res
    })
  }
test(){
 this.ds.castReload.subscribe(res=> {this.reload = res
    if(this.reload == true){
      this.foldersList = [];
      this.subscription=  this.ds.getListeFolders(this.domaineId).subscribe((res)=>{
        this.foldersList= res
      })
    }
  });
}


  getTablesListById(folderId){
    this.route.navigateByUrl('dataset/liste-tables/' + folderId)
  }

  deleteAll(){
    this.ds.deleteAll(this.domaineId).subscribe((res:any)=>{
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setMenuDisplay(){
    if(this.menuDisplay  == false){
      this.menuDisplay  = true;
    }else{
      this.menuDisplay  = false;
    }
    this.getActiveMenu();
  }

  /***get menu active */
  getActiveMenu(){
    let link_a =  document.querySelectorAll('.menu-g');
    // console.log(link_a.length);
    for (let i = 0; i < link_a.length; ++i) {
    //  console.log( link_a[i].textContent);

    }
    console.log(link_a.length);
    console.log('hello')
  }
  openDialogAddAccount() {
    this.dialog.open(AccountServiceComponent);

  }

}
