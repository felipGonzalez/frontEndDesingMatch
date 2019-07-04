import { Injectable } from '@angular/core';
import { ModelDraft } from 'src/app/models/ModelDraft';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTP_URL } from 'src/app/models/httpStatus';
import { RestResponse } from 'src/app/models/RestResponse.model';
import { ModelDesing } from 'src/app/models/ModelDesing';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  public getListDraft(idCompany:number): Observable<ModelDraft[]> {
    return this.http.get<ModelDraft[]>(HTTP_URL+'draft/'+idCompany);
  }

  public deleteDraft(idDraft:number): Observable<RestResponse> {
    return this.http.delete<RestResponse>(HTTP_URL+'draft/'+idDraft);
  }

  public getListDesing(id:number): Observable<ModelDesing[]> {
    return this.http.get<ModelDesing[]>(HTTP_URL+`/desing/`+id);
  }
}
