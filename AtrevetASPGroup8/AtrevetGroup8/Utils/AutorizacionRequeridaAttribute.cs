using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AtrevetGroup8.Utils
{
	public class AutorizacionRequeridaAttribute : Attribute, IAuthorizationFilter
	{
		public void OnAuthorization(AuthorizationFilterContext context)
		{
			if(!context.HttpContext.User.Identity.IsAuthenticated)
			{
				context.Result = new RedirectToRouteResult(new RouteValueDictionary ( new { controller = "Login", action = "Index" }));
			}
		}
	}
}
