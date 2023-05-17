import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AddFileComponent } from '../add-file/add-file.component';
import { datasetService } from '../../services/dataset.services';
import { FileParamsComponent } from '../file-params/file-params.component';

export interface PeriodicElement {
  displayName: string;
  position: number;
  email: string;
}




@Component({
  selector: 'app-liste-datasets',
  templateUrl: './liste-datasets.component.html',
  styleUrls: ['./liste-datasets.component.scss']
})
export class ListeDatasetsComponent implements OnInit {

  listUsers: any;
  ELEMENT_DATA: any[] = [];
  firstLetter: any[]=[];
  tableId:any;
  folderId:any;
  domaineId:string ;
  tableName : string ;
  showParams : boolean = false;
  reloded : boolean = false ;
  sidebar:boolean = false;
  tablesList:any;
  showSpinner : boolean = false;
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



  constructor(private ds:datasetService , private dialog: MatDialog, public fs: AngularFirestore, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.domaineId = localStorage.getItem("domaineId");
    this.folderId = this.activatedRoute.snapshot.paramMap.get('folderId');
    this.tableId =  this.activatedRoute.snapshot.paramMap.get('tableId');
    this.getInfos();
    this.getFilesList();
    this.getOverview()
    console.log(this.showParams);


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


  getAllUsers() {
    this.listUsers = [];
    return this.fs.collection('user_BQDS').valueChanges().subscribe((res: any) => {
      this.dataSource.data = res;
      this.dataSource.data.map((e: any) => {
        if (e.role == 1) {
          e.role = 'Admin'
        } else {
          e.role = 'User'
        }
        this.firstLetter.push(e.displayName.charAt(0))
        console.log(e.last_connected);

      })
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

delete(userId){
  console.log(userId);

}

openDialogAddUser() {
  this.dialog.open( FileParamsComponent, { data: {folderId: this.folderId , tableId: this.tableId , tableName: this.tableName }}
  );
}

getInfos(){
  this.ds.getscheme(this.domaineId,this.folderId,this.tableId).subscribe((res:any)=>{
    console.log(this.tableId);

    this.tableName = res.infos[0].table_name
    console.log(res);
  })
}
getFilesList(){
  this.ds.getFilesList(this.domaineId,this.folderId).subscribe((res:any)=>{
    if(res.message){
      this.showParams = true;
      console.log(this.showParams);
    }
   })
  }

  openDialogUser() {
    const data = {
      "table_id": this.tableId,
      "folder_id":this.folderId,
      'namespace_id':this.domaineId,

    }
  const dialogRef =  this.dialog.open(FileParamsComponent, {data:{ data : data , reloded: this.reloded  }}

    );

    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
       this.getOverview()   }
    });
  }
  getOverview(){
    this.loader = true;
    this.ds.getFilesList(this.domaineId,this.folderId).subscribe((res:any)=>{
      console.log(res);
      this.list = res;
      this.loader = false;

    })
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
  this.getTablesByFolder();
}

selectRow(item: any) {
  this.selectedItem = item;
  this.showActions = true;
  this.tableFocused = true;
}

}
