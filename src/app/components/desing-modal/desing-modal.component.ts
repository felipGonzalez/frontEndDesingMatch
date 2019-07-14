import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-desing-modal',
  templateUrl: './desing-modal.component.html',
  styleUrls: ['./desing-modal.component.css']
})
export class DesingModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DesingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public url: string) { }

  ngOnInit() {
  }

  public closeDialog() {
    this.dialogRef.close();
  }

}
