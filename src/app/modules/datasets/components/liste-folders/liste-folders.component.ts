import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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


export interface PeriodicElement {
  displayName: string;
  position: number;
  email: string;
}


@Component({
  selector: 'app-liste-folders',
  templateUrl: './liste-folders.component.html',
  styleUrls: ['./liste-folders.component.scss']
})
export class ListeFoldersComponent implements OnInit {
  listUsers: any;
  ELEMENT_DATA: any[] = [];
  firstLetter: any[] = [];
  sidebar: boolean = false;
  domaineId: string;
  tablesList: any;
  folderId: any;
  tableName: string;
  popup: boolean = false;
  reloded : boolean = false ;
  startedClass = false;
  completedClass = false;
  preventAbuse = false;
  showSpinner : boolean = false;
  showDelete: boolean  = false ;
  actionData : any ;
  tableSize: number = 10;
  page = 1;
  term: any;
  loader: boolean = true;
  list;
  showActions: boolean = false;
  pageIndex: number = 1;
  selectedItem: any;
  nb: number = 0;
  allChecked: any[] = [];
  [x: string]: any;

  constructor(private route: Router, private dialog: MatDialog, public fs: AngularFirestore, private ds: datasetService) {
    this.domaineId = localStorage.getItem("domaineId");
  }

  ngOnInit(): void {
    this.getFoldersList()
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = ['select', 'Name', 'Created On'];
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

  openDialogAddUser() {
    const dialogRef = this.dialog.open(AddFolderComponent);
    dialogRef.afterClosed().subscribe(result => {
        this.getFoldersList()
    });
  }

  openDialogEditUser(folderId) {
    const dialogRef =  this.dialog.open(UpdateFolderComponent, { data: {folderId : folderId ,  reloded: this.reloded},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.reloded == true){
        this.getFoldersList()
      }
    });
  }

  changeStatus() {
    this.sidebar = false;
  }

  checkItem(event , row) {
    console.log(row);

    if (event.checked == true) {
      this.sidebar = true
    } else {
      this.sidebar = false;
    }
  }

  etatSidebar() {
    this.sidebar = true;
    this.selection.clear()
    return this.sidebar
  }

  getFoldersList() {
    this.loader = true ;
    this.ds.getListeFolders(this.domaineId).subscribe((res) => {
      this.list = res
      this.loader = false;

    })
  }


  deleteFolder(folderId) {

    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes go on.',
      cancelButtonText: 'No, let me think.',
    }).then((result) => {
      if (result.value) {

        this.ds.deleteFolder(this.domaineId, folderId).subscribe(() => {
          Swal.fire('Deleted!', 'Folder successfully removed.', 'success');
          this.dataSource.data.splice(folderId);
          this.changeStatus();
          setTimeout(() => { this.getFoldersList() }, 1300);
        });


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Annulé', 'Folder still in our database.', 'error');
      }
    });

    this.ds.deleteFolder(this.domaineId, folderId).subscribe((res: any) => {
      console.log(res);
    })
    this.showDelete = false

  }


  goToTableDetail(tableId) {
    this.route.navigateByUrl('dataset/table-detail/' + this.folderId + '/' + tableId)
  }

  createNewTable() {
    const data = {
      "name": this.tableName,
      "id": '',
      'updated_on': '',
      'created_on': '',
      'id_bgquery': ''
    }
    this.ds.createTableName(this.domaineId, this.folderId, data).subscribe((res: any) => {
      console.log(res);
      this.popup = false;
      this.getTablesListByIdFolder(this.folderId);
    })
  }

  getTablesListByFolder(folderId) {
    this.route.navigateByUrl('dataset/liste-tables/' + folderId)
  }


@HostListener('document:click', ['$event'])
onClick(event: any) {
  if (!event.target.closest('table') && !event.target.closest('button')) {
    this.selectedRowIndex = -1;
  }
  if (this.selectedRowIndex == -1) {
    this.showActions = false;
    this.selectedRowIndex = 0
    this.tableFocused = false;
  }
}

onTableDataChange(event: any) {
  this.page = event;
  this.getDataTable();
}

selectRow(item: any) {
  this.selectedItem = item;
  this.showActions = true;
  this.tableFocused = true;
}


}
