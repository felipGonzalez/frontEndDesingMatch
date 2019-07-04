import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelCompany } from 'src/app/models/ModelCompany';
import {HttpClient} from '@angular/common/http';
import { HTTP_URL } from 'src/app/models/httpStatus';
import { RestResponse } from 'src/app/models/RestResponse.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }


  public validate(company: ModelCompany, flag): boolean {
    let isValid = true;
    if (!company.email) {
      isValid = false;
    }
    if (!company.password) {
      isValid = false;
    }

    if (!company.nameCompany && !flag) {
      isValid = false;
    }
   return isValid;
  }

  

  public verifyCompany(company:ModelCompany): Observable<ModelCompany> {
    console.log(company);
    
    return this.http.post<ModelCompany>(HTTP_URL+`/company/verifyCompany`,company);
  }

  public saveCompany(company:ModelCompany): Observable<RestResponse> {
    return this.http.post<RestResponse>(HTTP_URL+`/company`, company);
  }

}
