import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { SelectionModel } from '@angular/cdk/collections';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoginGoogleComponent } from 'src/app/modules/auth/components/login-google/login-google.component';
import { InviteUserComponent } from '../invite-user/invite-user.component';
import { userManagementService } from '../../services/user-management.service';
import swal from 'sweetalert2';

export interface PeriodicElement {
  displayName: string;
  position: number;
  email: string;
}

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.scss'],
})
export class ListeUserComponent implements OnInit {
  listUsers: any;
  ELEMENT_DATA: any[] = [];
  firstLetter: any[] = [];
  domaineId: string;
  showDelete: boolean = false;
  nameUser: string;
  deletedUser: string;
  tableSize: number = 10;
  page = 1;
  term: any;
  loader: boolean = true;
  list;
  showActions: boolean = false;
  pageIndex: number = 1;
  actionData: any;
  selectedItem: any;
  nb: number = 0;
  allChecked: any[] = [];
  [x: string]: any;


  constructor(
    private dialog: MatDialog,
    public fs: AngularFirestore,
    private us: userManagementService
  ) {
    this.getDataTable();
  }

  ngOnInit(): void {
    this.domaineId = localStorage.getItem('domaineId');
  }


  getDataTable() {
    this.loader = false;
    setTimeout(() => {
      this.us.getAllUsers(this.domaineId).subscribe((list) => {
        if (list) {
          this.list = list.users;
          console.log(this.list);

          this.loader = true;
        }
      });
    }, 200);
  }

  delete(id: string) {
    console.log(id);

    swal
      .fire({
        title: 'Are you sure to permanently delete this User ?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: `Cancel`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.us.deleteUser(this.domaineId, id).subscribe((list) => {
            this.getDataTable();
            swal.fire('User has been deleted', '', 'success');
          });
        } else {
          // swal.fire('Changes are not saved', '', 'info')
        }
      });
  }

  openDialogAddUser() {
    let dialogRef =  this.dialog.open(InviteUserComponent, {});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getDataTable();
    });
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



