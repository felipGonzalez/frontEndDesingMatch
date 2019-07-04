import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ModelDraft } from 'src/app/models/ModelDraft';
import { RestResponse } from 'src/app/models/RestResponse.model';
import { HTTP_URL } from 'src/app/models/httpStatus';

@Injectable({
  providedIn: 'root'
})
export class CreateDraftService {

 

  constructor(private http: HttpClient) {
  }

   public validate(draft:ModelDraft): boolean {
    let isValid = true;
    if (!draft.nameDraft) {
      isValid = false;
    }
    if (!draft.description) {
      isValid = false;
    }

    if (!draft.price) {
      isValid = false;
    }
   return isValid;
  }

   public saveOurUpdate(draft:ModelDraft): Observable<RestResponse> {
    return this.http.post<RestResponse>(HTTP_URL+'draft', draft);
  }

 
}
