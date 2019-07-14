import { Injectable } from '@angular/core';
import { ModelDesing } from 'src/app/models/ModelDesing';
import { Observable } from 'rxjs';
import { RestResponse } from 'src/app/models/RestResponse.model';
import { HTTP_URL } from 'src/app/models/httpStatus';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DesingService {

  constructor(private http: HttpClient) { }

  public  saveDesing(file:File, desing:ModelDesing, nameCompany: string): Observable<RestResponse> {
    let postData = new  FormData();
    postData.append('file', file[0]);
    postData.append('desing', JSON.stringify(desing));
    postData.append('company', nameCompany);
    return this.http.post<RestResponse>(HTTP_URL+'desing/upload', postData);
  }
  
}
