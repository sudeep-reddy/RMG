﻿using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RMG.Models;
namespace test_mysql.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.Employee> GetAllEmployee(string Emp_ID)
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.GetAllEmployee(Emp_ID);
        }
        [HttpPost("[action]")]
        public int AddEmployee([FromBody]List<RMG.Models.Employee> employee)
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            foreach (RMG.Models.Employee e in employee)
            {
                context.AddEmployee(e);
            }
            return 1;
        }
        [HttpPut("[action]")]
        public int UpdateEmployee([FromBody]Employee employee)
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            context.UpdateEmployee(employee);
            return 1;
        }
        [HttpGet("[action]")]
        public void DeleteEmployee(string Emp_Id)
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            context.DeleteEmployee(Emp_Id);
        }
    }
}