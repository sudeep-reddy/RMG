import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../services/EmployeeService';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }
  emps: Employee[] = [];
  addrowtable() {
    this.emps.push(this.NewEmployee());
  }
  delrowtable() {
    if (this.emps.length > 1) {
      this.emps.pop();
    }
  }
NewEmployee(): Employee {
    let e = new Employee();
    e.Emp_Id = "";
    e.Emp_Name = "";
    e.Designation_Id = "";
    e.Department_Id = "";
    e.Edge_Practice_Id = "";
    e.Coe_Id = "";
    e.Location_Code = "";
    e.Joining_Date = "";
    e.Contact_Number = "";
    e.Email_ID = "";
    e.Reporting_To = "";
    return e;
  }
ngOnInit() {
    this.emps.push(this.NewEmployee());
    this.LoadEmployeeDetails('');
    
  }
OnSubmit() {
    var ans = confirm("Do you want to Add a New Record");

    if (ans) {
      return this.employeeService.AddEmployee(this.emps).subscribe(
        result => {
          console.log(result);
          this.emp = [];
          this.emp.push(this.NewEmployee());
          this.LoadEmployeeDetails('');
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  emp: Employee[];
  emp1: Employee;
  Emp_Id: string;
  Emp_Name: string;




LoadEmployeeDetails(Emp_ID: string) {
    this.employeeService.GetAllEmployee(Emp_ID)
      .subscribe((data: Employee[]) => {
        this.emp = data;
      });
  }
  EditRowId: any = '';


edit(val) {
    this.EditRowId = val;
  }

update(ep: Employee) {
    var ans = confirm("Do you want to Save the changes: " + ep);

    if (ans) {
      return this.employeeService.updateEmployee(ep).subscribe(
        result => {
          console.log(result);
          this.LoadEmployeeDetails('');
        },
        err => {
          console.log(err);
        }
      );
    }
  }
cancel(ep: Employee) {
    var ans = confirm("Do you want to cancel the changes: " + ep);
    if (ans) {
      this.EditRowId = !this.EditRowId;
    } err => {
      console.log(err);
    }
  }
delete(Emp_Id: string)
  {
    var ans = confirm("Do you want to delete the record: " + Emp_Id);
    if (ans) {
      return this.employeeService.DeleteEmployee(Emp_Id).subscribe(result => {
        console.log(result);
        this.LoadEmployeeDetails('');
      },
        err => {
          console.log(err);
        }
      );
    }
  }

}

