import { Component, OnInit, ViewChild } from '@angular/core';
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



@Component({
  selector: 'app-add-tab',
  templateUrl: './add-tab.component.html',
  styleUrls: ['./add-tab.component.scss'],

})
export class AddTabComponent implements OnInit {
  tableName: string ;
  listUsers: any;
  ELEMENT_DATA: any[] = [];
  firstLetter: any[]=[];
  sidebar:boolean = false;
  domaineId:string ;
  tablesList:any;
  folderId:any;
  popup:boolean=false;

  constructor( private _snackBar: MatSnackBar , private activatedRoute: ActivatedRoute , private dialogRef: MatDialogRef<DialogAddUserComponent>,  private route:Router , private dialog: MatDialog, public fs: AngularFirestore,private ds:datasetService , @Inject(MAT_DIALOG_DATA) private data: any) {
    this.domaineId = localStorage.getItem("domaineId");
    //this.folderId = this.activatedRoute.snapshot.paramMap.get('folderId');

  }

  ngOnInit(): void {
  }

  submit(){
    const data2 = {
      "name": this.tableName,
      "id":'',
      'updated_on':'',
      'created_on':'',
      'id_bgquery':''
    }
    this.ds.createTableName(this.domaineId , this.data.folderId , data2).subscribe((res:any)=>{
      this._snackBar.open(res.message , 'close');
      this.data.reloded = true ;
      this.dialogRef.close(this.data.reloded) ;
    })
  }

  getTablesListByIdFolder(folderId){
    this.ds.getTablesByFolder(this.domaineId,folderId).subscribe((res:any)=>{
      this.tablesList = res
    })
  }


}
