import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Route, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }



  canActivate(): boolean {
    console.log('i am checking to see if you are logged in');
    console.log(localStorage.getItem("Emp_Id"));


    if (localStorage.getItem("Emp_Id")) {

      console.log("in canactivate authguard true");
      return true;
    }


    else if (localStorage.getItem("Emp_Id") == null) {
      this.router.navigate(['']);
      console.log("in canactivate authguard null");
      return true;
    }
    else {
      return true;
    }
    
  }

}
