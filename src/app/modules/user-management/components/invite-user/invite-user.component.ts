import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogAddUserComponent } from 'src/app/modules/user-management/components/dialog-add-user/dialog-add-user.component';
import { DialogEditUserComponent } from 'src/app/modules/user-management/components/dialog-edit-user/dialog-edit-user.component';
import { AddFolderComponent } from '../../../datasets/components/add-folder/add-folder.component';
import { datasetService } from '../../../datasets/services/dataset.services';
import { UpdateFolderComponent } from '../../../datasets/components/update-folder/update-folder.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { userManagementService } from '../../services/user-management.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';


@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {

  email: string ;
  listUsers: any;
  ELEMENT_DATA: any[] = [];
  firstLetter: any[]=[];
  sidebar:boolean = false;
  domaineId:string ;
  tablesList:any;
  folderId:any;
  popup:boolean=false;
  selectedValue: any ;
  addUserForm: FormGroup;
  submitted = false;


  constructor( private fb: FormBuilder , private _snackBar: MatSnackBar , private activatedRoute: ActivatedRoute , private dialogRef: MatDialogRef<DialogAddUserComponent>,  private route:Router , private dialog: MatDialog, public fs: AngularFirestore,private us: userManagementService , @Inject(MAT_DIALOG_DATA) private data: any) {
    this.domaineId = localStorage.getItem("domaineId");
    //this.folderId = this.activatedRoute.snapshot.paramMap.get('folderId');

  }

  get f() {
    return this.addUserForm.controls;
  }
  initForm() {
  this.submitted = false;
  this.addUserForm = this.fb.group({
    email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
  ]],
    role: ['',Validators.required],
    });
}


  ngOnInit(): void {
    this.initForm();

  }

  save(f:any) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addUserForm.invalid) {
        return;
    }
    let data =f.value
      data.email=data.email.toLowerCase()
      swal.fire({
        title: 'Are you sure to invite this user ?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: `Cancel`,
      }).then((result:any) => {
        if (result.isConfirmed) {
      this.us.inviteUser(this.domaineId,data).subscribe(res => {
        if(res.error?.status == 400){
          console.log(res.error.status);
          console.log(res.error.error.error);
        swal.fire(res.error.error.error, '', 'error')
        }else{
          swal.fire('User has been invited', '', 'success')
          this.dialogRef.close();
 }
      })
    }})

  }
}
