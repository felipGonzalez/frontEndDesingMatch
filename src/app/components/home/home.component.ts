import { Component, OnInit } from '@angular/core';

import {
  MatTableDataSource,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  TooltipPosition
} from "@angular/material";
import { LogComponent } from '../log/log.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  positionOptions: TooltipPosition = 'above';

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }


 

  openModal(flag:boolean) { 
    const dialogRef = this.dialog.open(LogComponent, {
      width: "600px",
      data : flag,
      maxWidth : "800px",
      autoFocus : false,
      panelClass: 'myapp-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

  

  

}
