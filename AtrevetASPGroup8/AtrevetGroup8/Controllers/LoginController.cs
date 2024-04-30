using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AtrevetGroup8.Controllers
{
	public class LoginController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

		[HttpPost]

		public IActionResult Index(string username, string password)
		{
			if(username == "borissejas9@gmail.com" && password == "123")
			{
				var claims = new List<Claim>
				{
					new Claim(ClaimTypes.Name, username),
					new Claim(ClaimTypes.Role, "Administrador")
				};

				var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
				var principal = new ClaimsPrincipal(identity);
				HttpContext.SignInAsync(principal);
				return RedirectToAction("Index", "Home");
			}
			ViewBag.Error = "Credenciales invalidas";
			return View();
		}
	}
}
