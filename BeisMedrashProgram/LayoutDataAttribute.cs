using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BeisMedrashProgram.data;

namespace BeisMedrashProgram
{
    public class LayoutDataAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            if (filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                UserRepository db = new UserRepository(Properties.Settings.Default.ConStr);
                var user = db.GetUser(filterContext.HttpContext.User.Identity.Name);
                var bm = db.GetBeisMedrashById(user.BeisMedrashId);
                filterContext.Controller.ViewBag.user = user;
                filterContext.Controller.ViewBag.BeisMedrash = bm;
            }

            base.OnActionExecuted(filterContext);
        }
    }
}