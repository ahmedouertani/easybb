import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddUserComponent } from 'src/app/modules/user-management/components/dialog-add-user/dialog-add-user.component';
import { datasetService } from '../../services/dataset.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss']
})
export class AddFolderComponent implements OnInit{

  addUserForm: FormGroup;
  submitted = false;
  listeInitialEmail:any[]=[]
  listDestinationEmail:any[]=[]
  selectedText: any = "yellow";
  domaineId: string ;
  folderName:any;
  reloaded: boolean = false ;
  busy :Subscription;
  foldersList: any[];
  message: any ;

  constructor( @Inject(MAT_DIALOG_DATA) private data: any , private dialogRef: MatDialogRef<DialogAddUserComponent>,  private fb: FormBuilder ,private us:datasetService
    ) {
      this.domaineId = localStorage.getItem("domaineId");
    }

    get f() {
      return this.addUserForm.controls;
    }
    initForm() {
    this.submitted = false;
    this.addUserForm = this.fb.group({
      name: ['',[Validators.required, Validators.pattern(/^[a-zA-Z]/)]],
      user_id: [''],
      created_on: [''],
      id: ['']
      });
  }

  ngOnInit(): void {
    this.submitted = false;
    this.initForm();

  }

  save(f:any) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addUserForm.invalid) {
        return;
    }

    let data =f.value

      data.user_id ='';
      data.created_on ='';
      data.id='';
      swal.fire({
        title: 'Are you sure to add this folder ?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: `Cancel`,
      }).then((result:any) => {
        if (result.isConfirmed) {
          this.us.createFolder(this.domaineId , data).subscribe(res => {
        if(res.error?.status == 400){
          console.log(res.error.status);
          console.log(res.error.error.error);
        swal.fire(res.error.error.error, '', 'error')
        }else{
          swal.fire('Folder has been added', '', 'success')
          this.dialogRef.close();
 }
      })
    }})
  }
}
