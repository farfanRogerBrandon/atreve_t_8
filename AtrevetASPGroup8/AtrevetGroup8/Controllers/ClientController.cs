using AtrevetGroup8.Models;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AtrevetGroup8.Controllers
{
    public class ClientController : Controller
    {

        public async Task<IActionResult> Index()
        {
            UserImpl user = new UserImpl();

            var clients = await user.GetClient();

            return View(clients);
        }

        public async Task<IActionResult> TopClients()
        {
            UserImpl user = new UserImpl();

            var clients = await user.TopClient();

            return View(clients);
        }

        public async Task<IActionResult> TopBadClients()
        {
            UserImpl user = new UserImpl();

            var clients = await user.TopBadClient();

            return View(clients);
        }
    }
}
