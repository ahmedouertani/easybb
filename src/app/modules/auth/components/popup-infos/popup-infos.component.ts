import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddUserComponent } from 'src/app/modules/user-management/components/dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-popup-infos',
  templateUrl: './popup-infos.component.html',
  styleUrls: ['./popup-infos.component.scss']
})
export class PopupInfosComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  ngOnInit(): void {
  }

}
