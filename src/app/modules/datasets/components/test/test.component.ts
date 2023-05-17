import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Directive, HostBinding, HostListener } from '@angular/core';
import { datasetService } from '../../services/dataset.services';
import { MatDialog } from '@angular/material/dialog';
import { AddFolderComponent } from '../add-folder/add-folder.component';
import { FileInput, FileValidator } from 'ngx-material-file-input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  domaineId: any;
  folderNames: any;
  fileForm: FormGroup;
  readonly maxSize = 104857600;
  hasUnitNumber = false;
  path: any;
  logoSelected:boolean=false;
  file:any ;
  notdone:boolean=false;

 

  constructor(private fb: FormBuilder, private ds: datasetService, private dialog: MatDialog) {
    this.domaineId = localStorage.getItem("domaineId");

  }
  changeListener(files: any) {
    console.log(files);
    if (files.target.files && files.target.files.length > 0) {
      this.file = files.target.files.item(0);
      this.notdone=true;
    }

    if (files.target.files[0]) {
      this.logoSelected = true;
    } else {
      this.logoSelected = false;
    }
  }
  onSubmit(): void {
  
    
    let data = this.fileForm.value
    const uploadedFile = new FormData();
    console.log("//////////////");
    console.log(data);
    console.log("//////////////");
    uploadedFile.append('file', this.file, this.file.name.replace(/\s/g, ""));

   // uploadedFile.append('file', new Blob([csv], { type: 'text/csv' }), file.name);
 //  uploadedFile.append('file', file, file.name.replace(/\s/g, ""));
  uploadedFile.append('skip_leading_rows', data.skip_leading_rows);
  uploadedFile.append('write_disposition', data.write_disposition);
    uploadedFile.append('field_delimiter','test');
    for (var pair of (uploadedFile as any).entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    this.ds.createFile('272626c0-6add-475e-83a0-3c1df7446b13', 'a34fd1f1b91f40368888a81fb9138b70', '566c3442f4aa4287a3a12836cbdae0d3' ,uploadedFile).subscribe((res:any)=>{
      console.log(res);
      
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
     // perso: ['', Validators.required]
    });

  }



}
