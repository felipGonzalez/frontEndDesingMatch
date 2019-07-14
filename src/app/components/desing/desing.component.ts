import { Component, OnInit, Inject } from '@angular/core';
import { ModelDesing } from 'src/app/models/ModelDesing';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { DesingService } from './desing.service';
import { ModelDraft } from 'src/app/models/ModelDraft';
import { ModelCompany } from 'src/app/models/ModelCompany';
import { OK } from 'src/app/models/httpStatus';

@Component({
  selector: 'app-desing',
  templateUrl: './desing.component.html',
  styleUrls: ['./desing.component.css']
})
export class DesingComponent implements OnInit {


  public nameFormControl = new FormControl('', [Validators.required,
    Validators.maxLength(60),
    Validators.required
  ]);

  public lastNameFormControl = new FormControl('', [Validators.required,
    Validators.maxLength(60),
    Validators.required
  ]);
  
  public priceFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10)
  ]);

  
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public desing: ModelDesing;
  public imagePath;
  imgURL: any;
  public message: string;
  public isCorrect: boolean;
  public file : any;
  public draft: ModelDraft;
  public company : ModelCompany;
  public sendDesing: boolean;

  constructor(public dialogRef: MatDialogRef<DesingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private serve:DesingService, private _snackBar: MatSnackBar) {
      this.desing = new ModelDesing();
     this.desing.nameDesigner = "sadsa";
      this.desing.lastNameDesigner = "sadsa";
      this.desing.email = "sadsa@asd.com";
      this.desing.value = 100000;
      this.isCorrect = true;
      this.draft = data.draft;
      this.company = data.company;
      console.log(this.draft);
      console.log(this.company);
      this.sendDesing = false;
     }

  ngOnInit() {
    this.desing.value
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public checkDesing() {
    if(this.file  !== undefined) {
      if(this.isCorrect) {
        this.saveDesing()
      }
    }else {
      this.isCorrect = false;
    }
  }

  public saveDesing() {
    this.sendDesing = true;
    this.desing.urlImgOriginal = this.file[0].name;
    this.desing.idDraft = this.draft.idDraft;
    this.desing.date = new Date();
    this.desing.urlImgConvert = "";
    this.desing.state = "P" 
    this.desing.nameCompany = this.company.urlCompany;
    
    console.log(this.desing);
    this.serve.saveDesing(this.file,this.desing,this.company.urlCompany).subscribe( res => {
      console.log(res);
      if(res.responseCode === OK) {
        this.closeDialog();
        this.openSnackBar("Diseño agregado, le notificaremos por correo cuando este listo", "Ok",5000);
      }else {
        this.openSnackBar("No se pudeo cargar su diseño", "Ok",2000);
        this.sendDesing = false;
      }
    }, err => {
      this.openSnackBar("No se pudeo cargar su diseño", "Ok",2000);
      this.sendDesing = false;
    }); 
    
  }



 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    console.log(files[0]);
    
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Solo imagenes soportadas";
      this.isCorrect = false;
      this.message = "";
      return;
    }
    this.file = files;
    this.isCorrect = true;
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  public openSnackBar(message: string, action: string, time) {
    this._snackBar.open(message, action, {
      duration: time,
    });
  }

}
