using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Firebase.Auth;
using Firebase.Auth.Providers;

namespace AtrevetGroup8.Controllers
{
	public class LoginController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

		[HttpPost]

		public async Task<IActionResult> Index(string username, string password)
		{
            FirebaseAuthConfig config = new FirebaseAuthConfig();
            config.AuthDomain = "atrevetgroup8.firebaseapp.com";
			config.ApiKey = "AIzaSyDYKEcmKOovpW1r0w148XkjqbewX3ybAhE";
			config.Providers = new FirebaseAuthProvider[]
			{
                new GoogleProvider().AddScopes("email"),
                    new EmailProvider()
            };
            Firebase.Auth.FirebaseAuthClient authClient = new FirebaseAuthClient(config);

            try
            {
                var user = await authClient.SignInWithEmailAndPasswordAsync(username, password);
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
            catch (Firebase.Auth.FirebaseAuthException ex)
            {
                ViewBag.Error = "Credenciales inválidas";
                return View();

            }
        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return RedirectToAction("Index", "Login");

        }

    }
}
