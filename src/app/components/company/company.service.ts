import { Injectable } from '@angular/core';
import { ModelCompany } from 'src/app/models/ModelCompany';
import { Observable } from 'rxjs';
import { HTTP_URL } from 'src/app/models/httpStatus';
import { HttpClient } from '@angular/common/http';
import { ModelDraft } from 'src/app/models/ModelDraft';
import { ModelDesing } from 'src/app/models/ModelDesing';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }


  public verifyCompany(url:string): Observable<ModelCompany> {
    return this.http.get<ModelCompany>(HTTP_URL+`/company/getCompany/${url}`);
  }

  public getImage(url:string): Observable<any> {
    return this.http.get<any>(HTTP_URL+`/desing/getImage/`+url);
  }

  public getImageRamdon(): Observable<any> {
    return this.http.get<any>(HTTP_URL+`/desing/getImage`);
  }

  public getListDraft(id:number): Observable<ModelDraft[]> {
    return this.http.get<ModelDraft[]>(HTTP_URL+`/draft/`+id);
  }

  public getListDesing(id:number): Observable<ModelDesing[]> {
    return this.http.get<ModelDesing[]>(HTTP_URL+`/desing/`+id);
  }


}
