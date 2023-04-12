import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { RegisterUserModel } from 'src/app/core/models/auth/RegisterUser.model';
import { SuccessResponseModel } from 'src/app/core/models/base/SuccessResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  //Obtem a Url da Api
  private apiRoot = environment.apiUrl;

  registerUser(user: RegisterUserModel) : Observable<SuccessResponseModel<RegisterUserModel>>{
    let response = this.http.post<SuccessResponseModel<RegisterUserModel>>(
      this.apiRoot + 'Auth/Register', user
    ).pipe();

    return response;
  }
}
