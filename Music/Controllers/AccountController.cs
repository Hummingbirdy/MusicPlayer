using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Music.Modals;
using Microsoft.AspNetCore.Authorization;
using Music.Modals.AccountViewModels;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication;

namespace Music.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;

        public AccountController(
                    UserManager<ApplicationUser> userManager,
                    SignInManager<ApplicationUser> signInManager,
                    ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
        }

        #endregion


        [HttpGet]
        [AllowAnonymous]
        public IActionResult Register(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> Register([FromBody]RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User created a new account with password.");

                    await _signInManager.SignInAsync(user, isPersistent: false);
                    _logger.LogInformation("User created a new account with password.");
                    return Json(new { Success = true });
                }
                AddErrors(result);
            }

            // If we got this far, something failed, redisplay form
            return Json(new { Success = false });
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Login(string returnUrl = null)
        {
            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<JsonResult> LoginApi([FromBody]LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User logged in.");
                    return Json(new { Success = true });
                }
                if (result.IsLockedOut)
                {
                    var message = "User account locked out.";
                    _logger.LogWarning(message);
                    return Json(new { Success = false, Message = message });
                }
                else
                {
                    var message = "Invalid login attempt.";
                    ModelState.AddModelError(string.Empty, message);
                    return Json(new { Success = false, Message = message });
                }
            }

            // If we got this far, something failed, redisplay form
            return Json(new { Success = false, Message = "error" });
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Lockout()
        {
            return View();
        }


        [HttpGet]
        public async Task<JsonResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Json(true);
            //_logger.LogInformation("User logged out.");
            //return RedirectToAction(nameof(HomeController.Index), "Home");
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<JsonResult> CheckLoginStatus()
        {
            var isSignedIn = _signInManager.IsSignedIn(HttpContext.User);
            if (isSignedIn)
            {

                var user = await _userManager.GetUserAsync(HttpContext.User);
                return Json(new { SignedIn = true, User = user });
            }

            return Json(new { SignedIn = false });
        }

    }
}