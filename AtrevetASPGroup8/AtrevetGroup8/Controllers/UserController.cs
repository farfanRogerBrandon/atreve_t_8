using AtrevetGroup8.Models;
using Microsoft.AspNetCore.Mvc;

namespace AtrevetGroup8.Controllers
{
    public class UserController : Controller
    {
        public async Task<ActionResult> Index()
        {
            UserImpl user = new UserImpl();

            var offerors = await user.GetOfferor();
            return View(offerors);
        }
    }
}
