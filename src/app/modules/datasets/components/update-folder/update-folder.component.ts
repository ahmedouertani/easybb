import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddUserComponent } from 'src/app/modules/user-management/components/dialog-add-user/dialog-add-user.component';
import { datasetService } from '../../services/dataset.services';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-folder',
  templateUrl: './update-folder.component.html',
  styleUrls: ['./update-folder.component.scss']
})
export class UpdateFolderComponent implements OnInit {
  submitted = false;
  listeInitialEmail:any[]=[]
  listDestinationEmail:any[]=[]
  selectedText: any = "yellow";
  domaineId: string ;
  folderName:any;

  constructor( private _snackBar: MatSnackBar ,  private dialogRef: MatDialogRef<DialogAddUserComponent>,  private fb: FormBuilder ,private us:datasetService ,   @Inject(MAT_DIALOG_DATA) private data: any

    ) {      
      this.domaineId = localStorage.getItem("domaineId");      
    }
   
  ngOnInit(): void {
    this.submitted = false;
  }

  submit(){
    this.submitted = true;
    const data2 = {
      "name": this.folderName,
      "id":'',
      'user_id':'',
      'created_on':''
    }
 this.us.updateFolder(this.domaineId ,this.data, data2).subscribe((res)=>{  
  console.log(res);
  this._snackBar.open(res.message , 'close');   
  this.data.reloded = true ; 
  this.dialogRef.close(this.data.reloded) ;  
 })
 }

}
