import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ModelCompany } from 'src/app/models/ModelCompany';
import { LogService } from './log.service';
import {Router} from '@angular/router';
import { OK } from 'src/app/models/httpStatus';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public passworFormControl = new FormControl('', [
    Validators.required,
    
  ]);

  public nameFormControl = new FormControl('', [Validators.required,
    Validators.maxLength(30)
  ]);

  public company:ModelCompany;
  public isCorrect;
  public message;
  public isOk:boolean;

  constructor(public dialogRef: MatDialogRef<LogComponent>,
    @Inject(MAT_DIALOG_DATA) public flag: boolean, private logService: LogService, private router:Router) { 
    this.initCompany();
    this.isCorrect = true;
    }

  ngOnInit() {
  }

  public initCompany() {
    this.company = new ModelCompany();
    this.company.email = "uptc@uptc.edu.co";
    this.company.password = "123456";
  }

  public changeDiv() {
    this.initCompany();
    this.flag ? this.flag = false : this.flag = true;
  }

  public loadCompany() {
    if(this.logService.validate(this.company,true)) {
      this.logService.verifyCompany(this.company).subscribe(res => {
        console.log(res);
        if(res === null) {
          this.isCorrect = false;
          this.message = " Correo o contraseña incorrecta"
        }else {
          sessionStorage.setItem("company", JSON.stringify(res));
          this.router.navigateByUrl('/company'); 
          this.dialogRef.close();
        }

    }, err => {
    });
    }else {
      this.isCorrect = false;
      this.message = "Verifique todos los datos";
    }

 
    
    
  }

  public saveCompany() {
    if(this.logService.validate(this.company,false)) {
      this.logService.saveCompany(this.company).subscribe(res => {
          if(res.responseCode === OK) {
            this.company.urlCompany = res.message;
            this.isOk = true;
        }else {
          this.isCorrect = false;
          this.message = " El correo ya esta registrado";
        }

    }, err => {
    });
    }else {
      this.isCorrect = false;
      this.message = "Verifique todos los datos";
    }
  }

  redirect() {
    this.router.navigateByUrl('/'+this.company.urlCompany); 
    sessionStorage.removeItem("company");
    this.dialogRef.close();
  }
}
