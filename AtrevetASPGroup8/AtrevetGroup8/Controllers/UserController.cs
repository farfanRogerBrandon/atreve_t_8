using AtrevetGroup8.Models;
using AtrevetGroup8.Utils;
using Microsoft.AspNetCore.Mvc;

namespace AtrevetGroup8.Controllers
{
    [AutorizacionRequerida]

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
