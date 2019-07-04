import { Component, OnInit } from '@angular/core';
import { ModelCompany } from 'src/app/models/ModelCompany';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ModelDraft } from 'src/app/models/ModelDraft';
import { CreateDraftService } from './create-draft.service';
import { OK } from 'src/app/models/httpStatus';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-draft',
  templateUrl: './create-draft.component.html',
  styleUrls: ['./create-draft.component.css']
})
export class CreateDraftComponent implements OnInit {
  
  public  company: ModelCompany;
  public draft: ModelDraft;
  public valid: boolean;
  public message:string;

  public nameFormControl = new FormControl('', [Validators.required,
    Validators.maxLength(30)
  ]);
  public descriptionFormControl = new FormControl('', [Validators.required,
    Validators.maxLength(255),
    Validators.required
  ]);
  
  public priceFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10)
  ]);

  constructor(private router: Router, private darfServe: CreateDraftService, private _snackBar: MatSnackBar) { 
    
    this.valid = true;
    
    if (sessionStorage.getItem('company')) {
      this.company = JSON.parse(sessionStorage.getItem( 'company'));
    } else {
      this.router.navigateByUrl('/'); 
    }
    if (sessionStorage.getItem('draft')) {
      this.draft = JSON.parse(sessionStorage.getItem( 'draft'));
    } else {
      this.draft = new ModelDraft();
    }
    this.draft.idCompany = this.company.idCompany;
    
    console.log(this.company);
  }

  ngOnInit() {
  }

  public closeSesion() {
    sessionStorage.removeItem('company');
    sessionStorage.removeItem('draft');
    this.router.navigateByUrl('/'); 
  }

  public cancel() {
    sessionStorage.removeItem('draft');
    this.router.navigateByUrl('/company'); 
  }

  public saveOrUpdate() {
    if(this.darfServe.validate(this.draft)) {
      this.darfServe.saveOurUpdate(this.draft).subscribe(res => {
          if(res.responseCode === OK) {
            sessionStorage.removeItem('draft');
            this.router.navigateByUrl('/company'); 
            this.openSnackBar("Modificacion guardada", "ok");
        }else {
          this.valid = false;
          this.message = "Intentelo de nuevo en unos minutos";
        }

    }, err => {
    });
    }else {
      this.valid = false;
      this.message = "Verifique todos los datos";
    }
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  

}
