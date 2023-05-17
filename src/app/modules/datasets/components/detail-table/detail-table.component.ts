import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit,ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { datasetService } from '../../services/dataset.services';
import { PeriodicElement } from '../list-dataset/liste-datasets.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail-table',
  templateUrl: './detail-table.component.html',
  styleUrls: ['./detail-table.component.scss']
})
export class DetailTableComponent implements OnInit {
  sidebar:boolean = false;
  domaineId:string ;
  tablesList:any;
  tableId:any;
  folderId:any;
  informations:any


  constructor(public fs: AngularFirestore,private ds:datasetService , private activatedRoute: ActivatedRoute) { 
    this.domaineId = localStorage.getItem("domaineId");
    this.folderId = this.activatedRoute.snapshot.paramMap.get('folderId'); 
    this.tableId =  this.activatedRoute.snapshot.paramMap.get('tableId');     
  }

  ngOnInit(): void {
    this.getInfos()
  }



getInfos(){
  this.ds.getscheme(this.domaineId,this.folderId,this.tableId).subscribe((res:any)=>{    
    this.informations = res.infos[0]
    console.log(this.informations);
    
  })
}

}
