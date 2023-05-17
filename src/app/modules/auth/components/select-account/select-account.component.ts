import { Component, OnInit } from '@angular/core';
import { getAuth } from "firebase/auth";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.scss']
})
export class SelectAccountComponent implements OnInit {
  searchAccount: any;
  currentUser: any;
  spaceName: any[] = [];
  selectedProject: any;
  durationInSeconds :number= 5;
  ProjectInfo:any;


  constructor(private authService: AuthService, private router: Router,private _snackBar: MatSnackBar) {
    this.currentUser = getAuth().currentUser;
    this.getProject();
  }

  ngOnInit(): void {
  }


  accountSelected(event: any) {
    this.selectedProject = event.value;
    this.getProjectById(this.selectedProject);
  }

  getProject() {
    this.authService.getProject().subscribe((res: any) => {
      this.spaceName = res;
    })

  }

  getProjectById(selectedProject){
    this.authService.getProjectById(selectedProject).subscribe((res:any)=>{
      this.ProjectInfo = res[0] ;
      console.log(this.ProjectInfo);
      
    })
  }

  goToProjectSpace() {
    if (this.selectedProject != '' && this.selectedProject != null && this.selectedProject) {
      localStorage.setItem('project', JSON.stringify(this.ProjectInfo));
      this.router.navigate(['dataset/create-dataset']);
    }else{
      console.log('you have to choose a project');
      this._snackBar.open('test!!!!!!!!!!!!!!!!');
    }   
  }

}
