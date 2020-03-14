using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Music.App.Controllers
{
    public class BaseAPIController : Controller
    {
        protected string GetUser()
        {
            var user = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return Regex.Replace(user, @"\D", "");
        }
    }
}