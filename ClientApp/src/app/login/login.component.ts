import { Component } from '@angular/core';
import { UserService } from '../services/UserService';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isExpanded = false;
  isExists: boolean;
  userIsExists: boolean;


  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {

  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  //code to test reactiveform
  registerForm: FormGroup;
  submitted = false;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],


    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit(name, password) {
    this.submitted = true;

    // stop here if form is invalid
    //if (this.registerForm.invalid) {
    //  return;
    //}

    console.log("in onsubmit");

    if (name == "") {
      alert('Username is Required');
    }
    else if (password == "") {
      alert('password is Required');
    }


    else {

      //check userid
      this.userService.ValidateUserId(name)
        .subscribe((data: boolean) => {
          this.userIsExists = data;

          if (data) {
            this.userService.ValidateUser(name, password)
              .subscribe((data: boolean) => {
                this.isExists = data;

                if (this.isExists) {
                  //this.router.navigate(['/counter', name]);
                  this.router.navigate(['/home']);
                  this.setSession(name, password);

                  console.log(name + "in homecomponent");

                }
                else {
                  alert('Please check Password you Entered');
                }

              });

          }
          else {
            console.log(name + "in homecomponent else condition");
            alert('Please check User Id you Entered ');
          }

        });


    }





    /*

   //code check userid and password

   this.userService.ValidateUser(name, password)
     .subscribe((data: boolean) => {
       this.isExists = data;

       if (this.isExists) {
         //this.router.navigate(['/counter', name]);
         this.router.navigate(['/counter']);
         this.setSession(name, password);

         console.log(name + "in homecomponent");

       }
else{
         alert('Please check User Id and Password');
}

     });  

*/

  }


  //adding data to localstorage
  private setSession(name, password) {
    localStorage.setItem('Emp_Id', name);
    localStorage.setItem("pwd", password);
    console.log("in Setsession");
    console.log(localStorage.getItem("Emp_Id"));

  }

  private logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("password");


  }





  }


