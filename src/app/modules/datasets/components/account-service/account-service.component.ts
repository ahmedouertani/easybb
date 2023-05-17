import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogAddUserComponent } from 'src/app/modules/user-management/components/dialog-add-user/dialog-add-user.component';
import { DialogEditUserComponent } from 'src/app/modules/user-management/components/dialog-edit-user/dialog-edit-user.component';
import { AddFolderComponent } from '../add-folder/add-folder.component';
import { datasetService } from '../../services/dataset.services';
import Swal from 'sweetalert2';
import { UpdateFolderComponent } from '../update-folder/update-folder.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getAuth } from 'firebase/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { finalize, map, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import swal from 'sweetalert2';



@Component({
  selector: 'app-account-service',
  templateUrl: './account-service.component.html',
  styleUrls: ['./account-service.component.scss']
})
export class AccountServiceComponent implements OnInit {
  downloadURL: Observable<string>;
  tableName: string ;
  listUsers: any;
  ELEMENT_DATA: any[] = [];
  firstLetter: any[]=[];
  sidebar:boolean = false;
  domaineId:string ;
  tablesList:any;
  folderId:any;
  popup:boolean=false;
  readonly maxSize = 104857600;
  hasUnitNumber = false;
  path: any;
  logoSelected: boolean = false;
  file: any;
  notdone: boolean = false;
  domaineName: any;
  name: string ;
  accountService: any;
  currentUser: any ;
  url:any;
  fileForm: FormGroup;
showButton : boolean = false ;


  constructor(private _snackBar: MatSnackBar ,private fb: FormBuilder ,
    private http: HttpClient,
    private _cdr: ChangeDetectorRef,
    private route: Router, private dialog: MatDialog, public fs: AngularFirestore, private ds: datasetService) {
    this.domaineId = localStorage.getItem("domaineId");
    this.domaineName = getAuth().currentUser.email
    this.domaineName = this.domaineName.substring(this.domaineName.indexOf('@') + 1);
    this.currentUser = getAuth().currentUser.uid ;
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.uploadForm.controls;
  }

  changeListener(files: any) {
    console.log(files);
    if (files.target.files && files.target.files.length > 0) {
      this.file = files.target.files.item(0);
      this.notdone = true;
      this.showButton = true ;
    }

    if (files.target.files[0]) {
      this.logoSelected = true;
    } else {
      this.logoSelected = false;
    }

  }

  getTablesListByIdFolder(folderId){
    this.ds.getTablesByFolder(this.domaineId,folderId).subscribe((res:any)=>{
      this.tablesList = res
    })
  }

  save(){
    console.log(this.domaineId);

   this.loader=true;
   this.submitted = true;
    const uploadedFile = new FormData();
    uploadedFile.append('file', this.file, this.file.name.replace(/\s/g, ""));
       swal.fire({
        title: 'Are you sure to add this Account Service ?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: `Cancel`,
      }).then((result:any) => {
        console.log(result);

        if (result) {
          this.ds.accountService(this.domaineId,uploadedFile).subscribe(res => {
        if(res.error?.status == 400){
          console.log(res.error.status);
          console.log(res.error.error.error);
        swal.fire(res.error.error.error, '', 'error')
        }else{
          swal.fire('Account Service has been added', '', 'success') }
          this.loader = false ;
          this.route.navigate(['/dataset/folders-list']);
        })
    }})
  }


  initForm() {
    this.fileForm = this.fb.group({
      file: [
        undefined,
        [Validators.required, FileValidator.maxContentSize(this.maxSize)]
      ],
    });

  }

  listdataset: any;
  usecase: any = null;
  nom: any = null;
  uploadForm: FormGroup;


  inputFile(fileInputEvent: any) {
    if (fileInputEvent.target.files[0]) {
      this.logoSelected = true;
    } else {
      this.logoSelected = false;
    }
  }

  loader:boolean=false;
  resetForm() {
    this.uploadForm.reset()
      this.uploadForm.get("name").setValue("");
      this.uploadForm.get("usecase").setValue("");


    // Object.keys(this.uploadForm.controls).forEach(key => {
    //   console.log((key));
    //   this.uploadForm.get(key).setValue("");

    //   // this.uploadForm.get(key).markAsUntouched();
    //   // this.uploadForm.get(key).markAsPristine();
    // });
  }
  submitted :boolean =false

  listdatasethdfs:any


  test:boolean=false

  changeStatus(): void {
    setTimeout(() => {
      this._cdr.detectChanges()
      this._cdr.markForCheck()
    }, 500);
  }

  public onFileSelected(files): void {
    console.log(files.addedFiles[0].name);
    if (files.addedFiles[0]) {
      this.file = files.addedFiles[0];
      this.name = files.addedFiles[0].name;

      this.notdone=true;
    }

    if (files.addedFiles[0]) {
      this.logoSelected = true;
    } else {
      this.logoSelected = false;
    }
  }
  onRemove() {
    this.logoSelected = false;
    this.file=undefined
    // this.file.splice(this.files.indexOf(event), 1);

  }

}
