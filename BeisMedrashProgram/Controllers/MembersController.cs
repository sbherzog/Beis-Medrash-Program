using BeisMedrashProgram.data;
using BeisMedrashProgram.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BeisMedrashProgram.Controllers
{
    [LayoutData]
    [Authorize]
    public class MembersController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.page = "Members";
            return View();
        }

        public ActionResult GetAllMembers(string type)
        {
            var u = new UserRepository(Properties.Settings.Default.ConStr);
            var user = u.GetUser(User.Identity.Name);
            if (user == null)
            {
                return null;
            }

            var tm = new MembersRepository(Properties.Settings.Default.ConStr);
            return Json(tm.GeAlltMembers(user.BeisMedrashId, type).Select(m => new
            {
                MemberId = m.MemberId,
                Active = m.Active,
                EnTitle = (m.EnTitle != null) ? m.EnTitle : "",
                LastName = (m.LastName != null) ? m.LastName : "",
                FirstName = (m.FirstName != null) ? m.FirstName : "",
                HeTitle = (m.HeTitle != null) ? m.HeTitle : "",
                HeLastName = (m.HeLastName != null) ? m.HeLastName : "",
                HeFirstName = (m.HeFirstName != null) ? m.HeFirstName : "",
                HeSuffix = (m.HeSuffix != null) ? m.HeSuffix : "",
                CellPhone = (m.CellPhone != null) ? m.CellPhone : "",
                TotalBalance = (m.TotalBalance != null) ? m.TotalBalance : 0,
            }), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public int AddUpdateMember(tbl_member member, string ToDo)
        {
            var m = new MembersRepository(Properties.Settings.Default.ConStr);

            var u = new UserRepository(Properties.Settings.Default.ConStr);
            var user = u.GetUser(User.Identity.Name);
            member.BeisMedrashId = user.BeisMedrashId;

            if (ToDo == "update")
            {
                m.UpdateMember(member);
            }
            else
            {
                DateTime now = DateTime.Now;
                member.CreteDate = now;
                member.TotalBalance = 0;
                m.AddNewMember(member);
            }
            return member.MemberId;
        }

        [HttpPost]
        public void DeleteMember(int MemberId)
        {
            var m = new MembersRepository(Properties.Settings.Default.ConStr);
            m.DeleteMember(MemberId);
        }

        public ActionResult MemberById(int MemberId)
        {
            var tm = new MembersRepository(Properties.Settings.Default.ConStr);
            var m = tm.MemberById(MemberId);
            return Json(new
            {
                MemberId = m.MemberId,
                EnTitle = (m.EnTitle != null) ? m.EnTitle : "",
                LastName = (m.LastName != null) ? m.LastName : "",
                FirstName = (m.FirstName != null) ? m.FirstName : "",
                HeTitle = (m.HeTitle != null) ? m.HeTitle : "",
                HeLastName = (m.HeLastName != null) ? m.HeLastName : "",
                HeFirstName = (m.HeFirstName != null) ? m.HeFirstName : "",
                HeSuffix = (m.HeSuffix != null) ? m.HeSuffix : "",
                AddNum = (m.AddNum != null) ? m.AddNum : "",
                AddStreet = (m.AddStreet != null) ? m.AddStreet : "",
                Apt = (m.Apt != null) ? m.Apt : "",
                City = (m.City != null) ? m.City : "",
                State = (m.State != null) ? m.State : "",
                Zip = (m.Zip != null) ? m.Zip : "",
                HomePhone = (m.HomePhone != null) ? m.HomePhone : "",
                CellPhone = (m.CellPhone != null) ? m.CellPhone : "",
                Email = (m.Email != null) ? m.Email : "",
                Notes = (m.Notes != null) ? m.Notes : "",
                Active = (m.Active != null) ? m.Active : "",
                SendEmail = (m.SendEmail != null) ? m.SendEmail : "",
                Type = (m.Type != null) ? m.Type : "",
                SendStatement = (m.SendStatement != null) ? m.SendStatement : "",
                TotalBalance = (m.TotalBalance != null) ? m.TotalBalance : 0,
            }, JsonRequestBehavior.AllowGet);
        }
    }
}