import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) { }

  ValidateUser(userId: any, password: any) {
    const params = new HttpParams()
      .set('userId', userId)
      .set('password', password);
    return this.httpClient.get(`api/Login/ValidateUser`, { params })

  }

  ValidateUserId(userId: any) {
    const params = new HttpParams()
      .set('userId', userId)

    return this.httpClient.get(`api/Login/ValidateUserId`, { params })

  }

  //logout service method
  logout() {
    localStorage.removeItem("Emp_Id");
    localStorage.removeItem("pwd");
    


  }


}
