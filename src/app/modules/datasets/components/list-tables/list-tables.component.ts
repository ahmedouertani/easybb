import { ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild , HostListener} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { datasetService } from '../../services/dataset.services';
import Swal from 'sweetalert2';
import { UpdateFolderComponent } from '../update-folder/update-folder.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodicElement } from '../list-dataset/liste-datasets.component';
import { AddTabComponent } from '../add-tab/add-tab.component';
import { delay } from 'rxjs/operators';
import { AddFileComponent } from '../add-file/add-file.component';
@Component({
  selector: 'app-list-tables',
  templateUrl: './list-tables.component.html',
  styleUrls: ['./list-tables.component.scss']
})
export class ListTablesComponent implements  OnInit{

  listUsers: any;
  ELEMENT_DATA: any[] = [];
  firstLetter: any[]=[];
  sidebar:boolean = false;
  domaineId:string ;
  tablesList:any;
  folderId:any;
  tableName: string ;
  popup:boolean=false;
  reloded : boolean = false ;
  showSpinner: boolean = false ;
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

  constructor(private cd: ChangeDetectorRef , private activatedRoute: ActivatedRoute , private route:Router , private dialog: MatDialog, public fs: AngularFirestore,private ds:datasetService) {
    this.showSpinner = true;
    this.domaineId = localStorage.getItem("domaineId");
    this.showSpinner = true;
    this.folderId = this.activatedRoute.snapshot.paramMap.get('folderId');
    this.activatedRoute.params.subscribe(params => {
      this.folderId = params['folderId'];
      console.log(this.folderId);

      this.getTablesByFolder();
  });
  }
getTablesByFolder(){
  this.loader = true ;
  this.ds.getTablesByFolder(this.domaineId,this.folderId).pipe(delay(1000)).subscribe((res:any)=>{
    if(res){
      console.log(res);
      this.list = res;
      this.loader = false ;
      console.log(this.loader);

    }
  })
}

  ngOnInit(){
   }

  openDialogAddUser() {
    const dialogRef =  this.dialog.open(AddFileComponent,
       { data: {folderId: this.folderId}}
    );
    dialogRef.afterClosed().subscribe(result => {
      this.getTablesByFolder();
    });
  }

  openDialogEditUser(folderId) {
    this.dialog.open(UpdateFolderComponent, {data:folderId});
  }



  goToTableDetail(tableId){
      this.route.navigateByUrl('dataset/table-detail/' + this.folderId + '/' + tableId)
  }


  deleteTable(folderId) {

    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes go on.',
      cancelButtonText: 'No, let me think.',
    }).then((result) => {
      if (result.value) {

        this.ds.deleteTable(this.domaineId, this.folderId,  folderId).subscribe(() => {
          Swal.fire('Deleted!', 'Table successfully removed.', 'success');
          this.dataSource.data.splice(folderId);
          this.changeStatus();
          this.showSpinner = true ;
          setTimeout(() => {    this.ds.getTablesByFolder(this.domaineId,this.folderId).pipe(delay(1000)).subscribe((res:any)=>{
            this.dataSource.data = res
          this.showSpinner = false ;
          })
        }, 1300);
        });


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancel', 'Table still in our database.', 'error');
      }
    });

    this.ds.deleteTable(this.domaineId , this.folderId,  folderId).subscribe((res: any) => {
      console.log(res);
    })

    this.showDelete = false
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
