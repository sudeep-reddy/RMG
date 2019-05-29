using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RMG.Models;

namespace RMG.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {

        [HttpGet("[action]")]
        public bool ValidateUser(String userId, String password)
        {
            LoginContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.LoginContext)) as LoginContext;
            return context.ValidateUser(userId, password);
        }



        [HttpGet("[action]")]
        public bool ValidateUserId(String userId)
        {
            LoginContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.LoginContext)) as LoginContext;
            return context.ValidateUserId(userId);
        }
    }
}