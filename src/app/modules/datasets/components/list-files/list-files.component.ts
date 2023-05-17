import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogAddUserComponent } from 'src/app/modules/user-management/components/dialog-add-user/dialog-add-user.component';
import { DialogEditUserComponent } from 'src/app/modules/user-management/components/dialog-edit-user/dialog-edit-user.component';
import { AddFolderComponent } from '../add-folder/add-folder.component';
import { datasetService } from '../../services/dataset.services';
import Swal from 'sweetalert2';
import { UpdateFolderComponent } from '../update-folder/update-folder.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountServiceComponent } from '../account-service/account-service.component';
import { PeriodicElement } from '../list-dataset/liste-datasets.component';
@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent implements OnInit {
  sidebar:boolean = false;
  domaineId:string ;
  tablesList:any;
  tableId:any;
  folderId:any;
  showSpinner : boolean = false;


  constructor(public fs: AngularFirestore,private ds:datasetService , private activatedRoute: ActivatedRoute) {
    this.domaineId = localStorage.getItem("domaineId");
    this.folderId = this.activatedRoute.snapshot.paramMap.get('folderId');
    this.tableId =  this.activatedRoute.snapshot.paramMap.get('tableId');
  }

  ngOnInit(): void {
    this.getOverview()
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = ['name' , 'created_on'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  changeStatus(){
    this.sidebar=false;
    }

  checkItem(event){
    if(event.checked == true){
      this.sidebar = true
    }else{
      this.sidebar = false ;
    }
  }


getOverview(){
  this.showSpinner = true;
  this.ds.getFilesList(this.domaineId,this.folderId).subscribe((res:any)=>{
    console.log(res);
    this.dataSource.data = res;
    this.showSpinner = false;

  })
}



}
