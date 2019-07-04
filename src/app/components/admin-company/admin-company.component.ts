import { Component, OnInit } from '@angular/core';
import { ModelCompany } from 'src/app/models/ModelCompany';
import { Router } from '@angular/router';
import { CompanyService } from './company.service';
import { ModelDraft } from 'src/app/models/ModelDraft';
import { MatTableDataSource } from '@angular/material';
import { OK } from 'src/app/models/httpStatus';

@Component({
  selector: 'app-admin-company',
  templateUrl: './admin-company.component.html',
  styleUrls: ['./admin-company.component.css']
})
export class AdminCompanyComponent implements OnInit {

  public company: ModelCompany;
  public isValid: boolean;
  public loadSpinner: boolean;
  public existProyect: boolean;
  public message: string;
  public listDraft: Array<ModelDraft>;
  public date = new Date();
  public isload: boolean;
  dataSource;

  displayedColumns: string[] = ['idDraft', 'nameDraft', 'price', 'action'];

  constructor(private router: Router, private companyServe: CompanyService) {
    if (sessionStorage.getItem('company')) {
      this.company = JSON.parse(sessionStorage.getItem('company'));
    } else {
      this.router.navigateByUrl('/');
    }
    this.isValid = true;
    this.existProyect = true;
    this.loadSpinner = true;
    this.message = '';
    this.isload = false;
  }

  ngOnInit() {
    this.loadListDraft();
  }


  public loadListDraft() {
    this.companyServe.getListDraft(this.company.idCompany).subscribe(res => {
      console.log(res);
      this.loadSpinner = false;
      if (res.length > 0) {
        this.listDraft = res;
        this.dataSource = new MatTableDataSource(this.listDraft);
        this.isload = true;
      } else {
        this.existProyect = false;
      }

    }, err => {
    });
  }

  public closeSesion() {
    sessionStorage.removeItem('company');
    sessionStorage.removeItem('draft');
    this.router.navigateByUrl('/'+this.company.urlCompany);
  }

  public editDraft(draft: ModelDraft) {
    sessionStorage.setItem("draft", JSON.stringify(draft));
    this.router.navigateByUrl('/draft');
  }

  public deleteDraft(draft: ModelDraft) {
    this.companyServe.deleteDraft(draft.idDraft).subscribe(res => {
      if(res.responseCode === OK  ) {
        for (let i = 0; i < this.listDraft.length; i++) {
          if (this.listDraft[i].idDraft === draft.idDraft) {
            this.listDraft.splice(i, 1);
            break
          }
        }
        this.dataSource = new MatTableDataSource(this.listDraft);
      }else {
        alert("No se puedo eliminar");  
      }
    }, error => {
      alert("No se puedo eliminar");
    });

    

  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

