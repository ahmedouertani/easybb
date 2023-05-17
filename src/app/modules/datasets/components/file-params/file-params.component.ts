import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Directive, HostBinding, HostListener } from '@angular/core';
import { datasetService } from '../../services/dataset.services';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddFolderComponent } from '../add-folder/add-folder.component';
import { FileInput, FileValidator } from 'ngx-material-file-input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { getAuth } from "firebase/auth";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogAddUserComponent } from 'src/app/modules/user-management/components/dialog-add-user/dialog-add-user.component';
@Component({
  selector: 'app-file-params',
  templateUrl: './file-params.component.html',
  styleUrls: ['./file-params.component.scss']
})
export class FileParamsComponent implements OnInit {

  domaineId: any;
  folderNames: any;
  fileForm: FormGroup;
  readonly maxSize = 104857600;
  hasUnitNumber = false;
  path: any;
  logoSelected: boolean = false;
  file: any;
  notdone: boolean = false;
  showSpinner : boolean = false;
  showParams : boolean = true;




  constructor( private dialogRef: MatDialogRef<DialogAddUserComponent>, private fb: FormBuilder, private ds: datasetService, private dialog: MatDialog ,  private _snackBar: MatSnackBar , @Inject(MAT_DIALOG_DATA) private data: any) {
    this.domaineId = localStorage.getItem("domaineId");
    this.getFilesList()


  }
  changeListener(files: any) {
    console.log(files);
    if (files.target.files && files.target.files.length > 0) {
      this.file = files.target.files.item(0);
      this.notdone = true;
    }

    if (files.target.files[0]) {
      this.logoSelected = true;
    } else {
      this.logoSelected = false;
    }
  }

  onSubmit(): void {
    this.showSpinner = true;
    let data = this.fileForm.value
    const uploadedFile = new FormData();
    uploadedFile.append('file', this.file, this.file.name.replace(/\s/g, ""));
    uploadedFile.append('table_name', this.data.tableName);
    uploadedFile.append('skip_leading_rows', data.skip_leading_rows);
    uploadedFile.append('write_disposition', data.write_disposition);
    uploadedFile.append('field_delimiter', data.field_delimiter);
    this.ds.uploadFile(this.domaineId , this.data.folderId ,uploadedFile ,this.data.tableId).subscribe((res: any) => {
      this.dialogRef.close(this.data.reloded) ;
      this.showSpinner = true;
    })
  }
  ngOnInit(): void {
    this.initForm();
  }



  openDialogAddUser() {
    this.dialog.open(AddFolderComponent, {
    });
  }



  checkItem(event) {
    console.log(event);
  }

  selectFiledDelimitor(event) {
    console.log(event);
  }


  initForm() {
    this.fileForm = this.fb.group({
      file: [
        undefined,
        [Validators.required, FileValidator.maxContentSize(this.maxSize)]
      ],
      field_delimiter: [null, Validators.required],
      write_disposition: [null, Validators.required],
      skip_leading_rows: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(5)])
      ],
      table_name:['']
      // perso: ['', Validators.required]
    });

  }


  getFilesList(){
    this.ds.getFilesList(this.data.namespace_id,this.data.folder_id ).subscribe((res:any)=>{
      if(res.message){
        this.showParams = false;
        console.log(this.showParams);
      }
     })
    }



}
