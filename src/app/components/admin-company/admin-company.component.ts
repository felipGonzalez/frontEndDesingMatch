import { Component, OnInit } from '@angular/core';
import { ModelCompany } from 'src/app/models/ModelCompany';
import { Router } from '@angular/router';
import { CompanyService } from './company.service';
import { ModelDraft } from 'src/app/models/ModelDraft';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { OK } from 'src/app/models/httpStatus';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModelDesing } from 'src/app/models/ModelDesing';
import {PageEvent} from '@angular/material/paginator';
import { DesingModalComponent } from '../desing-modal/desing-modal.component';


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
  public dataSource;
  public dataSourceDesing;
  public draftActually: ModelDraft;

  public viewDesin: boolean;
  public existDesing: boolean;
  public desingActually: boolean;
  public isloadDesing: boolean;
  public listDesing: Array<ModelDesing>;

  // MatPaginator Inputs
  public lengthData: number;
  public pageSize: number;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public pageIndex:number;

  // MatPaginator Output
  public pageEvent: PageEvent;

   displayedColumns: string[] = ['idDraft', 'nameDraft', 'price', 'action'];
   displayedColumnsDesing: string[] = ['idDesing', 'nameDesigner', 'email','date','state', 'action'];

  constructor(private router: Router, private companyServe: CompanyService, private _snackBar: MatSnackBar, private dialog: MatDialog) {
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
    this.pageSize = 10;
    this.pageIndex =0;
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
    this.router.navigateByUrl('/' + this.company.urlCompany);
  }

  public editDraft(draft: ModelDraft) {
    sessionStorage.setItem("draft", JSON.stringify(draft));
    this.router.navigateByUrl('/draft');
  }

  public deleteDraft() {
    this.companyServe.deleteDraft(this.draftActually.idDraft).subscribe(res => {
      if (res.responseCode === OK) {
        for (let i = 0; i < this.listDraft.length; i++) {
          if (this.listDraft[i].idDraft === this.draftActually.idDraft) {
            this.listDraft.splice(i, 1);
            break
          }
        }
        this.openSnackBar("Proyecto Eliminado", "Ok");
        this.dataSource = new MatTableDataSource(this.listDraft);
      } else {
        alert("No se puedo eliminar");
      }
    }, error => {
      alert("No se puedo eliminar");
    });
  }

  public loadDesing(draft: ModelDraft) {
    this.draftActually = draft;
    this.isload = false;
    this.viewDesin = true;
    this.companyServe.getListDesing(this.draftActually.idDraft).subscribe(
      res => {
        this.listDesing = res;
        console.log(this.listDesing);
        
        if (this.listDesing.length === 0) {
          this.existDesing = true;
          
        } else {
          this.lengthData = this.listDesing.length;
          this.setDataSourceDesing(); 
         this.isloadDesing = true;

        }
      }, err => {

      }
    );
  }


  public setDataSourceDesing() {
    if(this.pageEvent !== undefined) {
      this.pageIndex = this.pageEvent.pageIndex;
      this.pageSize = this.pageEvent.pageSize; 
     }
    this.createDataSource();
 
  }

  public createDataSource() {
    var axuListDesing = new Array<ModelDesing>();
    var index = this.pageSize * this.pageIndex;
    var limit = index + this.pageSize;
    if(this.listDesing.length > this.pageSize) {
      for (let i = index; i < limit; i++) {
        if(this.listDesing[i] !== undefined) {
          axuListDesing.push(this.listDesing[i]);
        }else {
          this.dataSourceDesing = new MatTableDataSource(axuListDesing);
          break;
        }
      }
      this.dataSourceDesing = new MatTableDataSource(axuListDesing);
     }else {
      this.dataSourceDesing = new MatTableDataSource(this.listDesing);
    }
  }

  public setDraft(draft: ModelDraft) {
    this.draftActually = draft;
  }

  public setDraftNull() {
    this.draftActually = undefined;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public showDraft() {
    this.setDraftNull();
    this.isload = true;
    this.viewDesin = false;
    this.existDesing = false;
    this.isloadDesing = false;
  }

  public getState(state:string):string {
    return state === 'D' ? 'Disponible' : 'Procesando';
  }

  openModal(url:string) { 

    console.log(this.getUrl(url));
    

    const dialogRef = this.dialog.open(DesingModalComponent, {
      width: "900px",
      height: "750px",
      data :  `http://localhost:8080/desing/getImageFinal?data=${this.company.urlCompany}&data=${this.draftActually.idDraft}&data=${url}`,
      autoFocus : false,
      panelClass: 'myapp-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
 
  public  getUrl(url:string):string{
   
    return  `http://localhost:8080/desing/getImageDesing?data=${this.company.urlCompany}&data=${this.draftActually.idDraft}&data=${url}`;
   }


}

