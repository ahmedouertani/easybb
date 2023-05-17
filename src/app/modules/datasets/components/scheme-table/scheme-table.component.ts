import { SelectionModel } from '@angular/cdk/collections';
import { Component, HostListener, OnInit,ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { datasetService } from '../../services/dataset.services';
import { PeriodicElement } from '../list-dataset/liste-datasets.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scheme-table',
  templateUrl: './scheme-table.component.html',
  styleUrls: ['./scheme-table.component.scss']
})
export class SchemeTableComponent implements OnInit {

  sidebar:boolean = false;
  domaineId:string ;
  tablesList:any;
  tableId:any;
  folderId:any;
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


  constructor(public fs: AngularFirestore,private ds:datasetService , private activatedRoute: ActivatedRoute) {
    this.domaineId = localStorage.getItem("domaineId");
    this.folderId = this.activatedRoute.snapshot.paramMap.get('folderId');
    this.tableId =  this.activatedRoute.snapshot.paramMap.get('tableId');
  }

  ngOnInit(): void {
    this.getscheme()
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['select', 'Name','Type', 'Mode' ];
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


getscheme(){
  this.loader = true;
  this.ds.getscheme(this.domaineId,this.folderId,this.tableId).subscribe((res:any)=>{
    this.list = res.data_scheme
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
  this.getscheme();
}

selectRow(item: any) {
  this.selectedItem = item;
  this.showActions = true;
  this.tableFocused = true;
}

}
