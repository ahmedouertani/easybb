import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-v2',
  templateUrl: './login-v2.component.html',
  styleUrls: ['./login-v2.component.scss']
})
export class LoginV2Component implements OnInit {

  login = [
    { id: 1, name: "Sami",  email: "sami@tanitlab.com", password: 123456  },
    { id: 2, name: "Ahmed",  email: "ahmed@test.com", password: 121212  },
    { id: 3, name: "Fatma",  email: "fatma@test.com", password: 987654  },
  ];




  constructor() { }

  ngOnInit(): void {
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

  /** function get email */
  getEmail(){
    if(this.emailFormControl.errors == null){
      this.emailform = document.querySelector('#emailform');
      // console.log(this.emailform.value);
          for (let i = 0; i <= this.login.length; i++) {
            if(this.emailform.value == this.login[i].email){            
              this.emailCondition = false;
              this.hideDivEmail = true;
              this.passwordUserPosition = i;
              this.userMail = this.login[i].email;
              this.userName = this.login[i].name;
               break;
            }else{
              this.emailCondition = true;
              // console.log(this.emailCondition);
              // console.log('this email does not exist');     
            }
          }
        } 
  }

  /** function get password */
  getPassword(){
    if(this.passwordFormControl.errors == null){
      this.passwordform = document.querySelector('#passwordform');
          if(this.passwordform.value == this.login[this.passwordUserPosition].password){
            this.passwordCondition = false;
          }else{
            this.passwordCondition = true;
          }
    }
  }
}
