using AtrevetGroup8.Models;
using AtrevetGroup8.Utils;
using Google.Api;
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

        public async Task<IActionResult> Delete(string id)
        {
            UserImpl userImpl = new UserImpl();

            var user = await userImpl.DatosUserEliminando(id);

            return View(user);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            UserImpl userImpl = new UserImpl();

            await userImpl.DeleteLogicUser(id);

            return RedirectToAction(nameof(Index));
            
        }

        public async Task<ActionResult> TopOffers()
        {
            UserImpl user = new UserImpl();
            var offerors = await user.GetOfferor();
            var orderedOfferors = offerors.OrderByDescending(x => x.Item3).Take(20).ToList();
            return View(orderedOfferors);
        }

        public async Task<ActionResult> TopBadOffers()
        {
            UserImpl user = new UserImpl();
            var offerors = await user.GetOfferor();
            var orderedOfferors = offerors.OrderBy(x => x.Item3).TakeLast(20).ToList();

            return View(orderedOfferors);

        }
    }
}
