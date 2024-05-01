using AtrevetGroup8.Models;
using AtrevetGroup8.Utils;
using Microsoft.AspNetCore.Mvc;

namespace AtrevetGroup8.Controllers
{
    [AutorizacionRequerida]
    public class GarageController : Controller
    {
        public async Task<ActionResult> Index()
        {
            GarageImpl garage = new GarageImpl();
            var garages = await garage.GetGarage();
            return View(garages);
        }
    }
}
