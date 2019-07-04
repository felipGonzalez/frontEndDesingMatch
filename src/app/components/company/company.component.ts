import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { LogComponent } from '../log/log.component';
import { MatDialog } from '@angular/material';
import { CompanyService } from './company.service';
import { ModelCompany } from 'src/app/models/ModelCompany';
import { ModelDraft } from 'src/app/models/ModelDraft';
import { ModelDesing } from 'src/app/models/ModelDesing';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  public name:string;
  public existError:boolean;
  public isOk;
  public company:ModelCompany;
  public listDraft: Array<ModelDraft>;
  public loadDrafts:boolean;
  public notLoadDrafts:boolean;
  public viewDraft:boolean;
  public urlImg: "http://localhost:8080/desing/getImage";
  public colors;
  public listDesing : Array<ModelDesing>;
  public existDesing: boolean;
  public isloadDesing: boolean;
  public draftActually : ModelDraft;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private companyServe : CompanyService
    ) { 

      this.colors = ["#feca0a","#18a66b","#00a6b9","#24403d","#9b8763","#37495f","#ff0177","#954d35","#e22d2d","#da06dd","#4add21","#fff200","#892727"];

    }

  ngOnInit() {
    
    this.loadPage();
    
  }

  public loadPage() {
    this.companyServe.verifyCompany(this.route.snapshot.paramMap.get('name')).subscribe(
      res => {
        console.log(res);
        if(res === null) {
          this.existError = true
        }else {
          this.company = res;
          this.isOk = true
          this.loadDraft();
        }
        
      }, err => {
        this.existError = true
        console.log(err);
        
      }
    );
  }

  public  loadDraft() {
    this.companyServe.getListDraft(this.company.idCompany).subscribe(
      res => {
        this.listDraft = res;
        if(this.listDraft.length === 0) {
          console.log("No hay proyectos");
          this.notLoadDrafts = true;  
        }else {
          console.log(this.listDraft);
          this.loadDrafts = true;
        }
        
        
      }, err => {});

  }

  public loadDesing(draft:ModelDraft) {
    this.draftActually = draft;
    this.companyServe.getListDesing(this.draftActually.idDraft).subscribe(
      res => {
        this.listDesing = res;
        if(this.listDesing.length === 0) {
          this.existDesing = true;
          this.setViewDraft();
        }else {
          this.isloadDesing = true;
          this.setViewDraft();
        }
      }, err => {
        
      }
    );
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

  public setViewDraft() {
    this.viewDraft = true;
    this.loadDrafts = false;
  }

  public viewListDrafts(){
    this.viewDraft = false;
    this.loadDrafts = true;
    this.existDesing = false;
  }

  public  getUrl(url:string):string{
   
    return  `http://localhost:8080/desing/getImageDesing?data=${this.company.urlCompany}&data=${this.draftActually.idDraft}&data=${url}`;
   }



}
