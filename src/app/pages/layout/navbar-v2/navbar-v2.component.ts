import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from "firebase/auth";
import { AuthService } from 'src/app/modules/auth/services/auth.service';


@Component({
  selector: 'app-navbar-v2',
  templateUrl: './navbar-v2.component.html',
  styleUrls: ['./navbar-v2.component.scss']
})
export class NavbarV2Component implements OnInit {
  currentUser: any;

  constructor(
    private authService: AuthService,
    public fs: AngularFirestore) {
    this.currentUser = getAuth().currentUser;
    console.log(this.currentUser);
    
    
   }

  ngOnInit(): void {
  }


  logout(){
    this.authService.logout()
   }
}
