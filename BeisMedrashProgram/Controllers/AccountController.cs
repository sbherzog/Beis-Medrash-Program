using BeisMedrashProgram.data;
using BeisMedrashProgram.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace BeisMedrashProgram.Controllers
{
    [LayoutData]
    public class AccountController : Controller
    {
        public ActionResult Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                return View();
            }
            return RedirectToAction("Login", "Account");
        }

        public ActionResult Register()
        {
            var vm = new LoginViewModel
            {
                ErrorMessage = TempData["error"] as string
            };

            return View(vm);
        }

        [HttpPost]
        public ActionResult Register(HttpPostedFileBase file, tbl_beis_medrash beisMedrash, string firstName, string lastName, string email, string password)
        {
            if (firstName == null || lastName == null || email == null || password == null || beisMedrash.BeisMedrashName == null)
            {
                return RedirectToAction("Register", "Account");
            }

            //Open DataBase
            var db = new UserRepository(Properties.Settings.Default.ConStr);

            //Empty var
            int beisMedrashId = 0;
            string emailInfo = "";

            //Check if have Beis Medrash Code
            int? value = beisMedrash.BeisMedrashCode;
            if (value != 0)
            {
                var bm = checkBeisMedrashCode(beisMedrash.BeisMedrashCode, beisMedrash.BeisMedrashName);
                if (bm == null)
                {
                    TempData["error"] = "The Beis Medrash Code or Beis Medrash Name you have entered do not match. Please try again.";
                    return RedirectToAction("Register", "Account");
                }
                else
                {
                    beisMedrashId = bm.Id;
                }
            }
            else
            {
                //Create a Random code
                Random rnd = new Random();
                beisMedrash.BeisMedrashCode = int.Parse(rnd.Next(0, 1000000).ToString("D6"));

                //Save Logo
                beisMedrash.Logo = SaveFile(file, "BeisMedrashLogos");

                //Add Beis Medrash
                db.AddBeisMedrash(beisMedrash);
                beisMedrashId = beisMedrash.Id;
                emailInfo = $"<br />Beis Medrash Name: <strong>{beisMedrash.BeisMedrashName}</strong> <br/>Beis Medrash Code: <strong>{beisMedrash.BeisMedrashCode}</strong>";
            }

            //Add Beis Medrash & user
            db.AddUser(firstName, lastName, email, password, beisMedrashId);

            //Login
            FormsAuthentication.SetAuthCookie(email, true);

            //Send Email
            var user = db.GetUser(email);
            emailInfo = $"Welcome, <strong>{user.FirstName}</strong>,<br /><br />Thank you for registering Account with us." + emailInfo;

            var gr = new GeneralRespository(Properties.Settings.Default.ConStr);
            string baseUrl = Request.Url.Scheme + "://" + Request.Url.Authority + Request.ApplicationPath.TrimEnd('/');
            string link = baseUrl + "/Account/Login";
            string html = $"{emailInfo}<br/><a href='{link}'>Click here to login to your account</a>";
            gr.SendEmail(email, "Account Registration - Beis Medrash Progran", html);

            return RedirectToAction("Index", "Account");
        }

        public ActionResult Login()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Account");
            }

            var vm = new LoginViewModel
            {
                Email = TempData["email"] as string,
                ErrorMessage = TempData["error"] as string
            };
            return View(vm);
        }

        [HttpPost]
        public ActionResult Login(string email, string password)
        {
            var db = new UserRepository(Properties.Settings.Default.ConStr);
            var user = db.Login(email, password);
            if (user == null)
            {
                TempData["error"] = "The User ID or Passcode you have entered do not match. Please try again.";
                TempData["email"] = email;
                return RedirectToAction("Login");
            }

            FormsAuthentication.SetAuthCookie(email, true);
            return RedirectToAction("Index", "Account");
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "Account");
        }

        public ActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ForgotPassword(string email)
        {
            if (email == "" || email == null)
            {
                return RedirectToAction("ForgotPassword");
            }

            var db = new UserRepository(Properties.Settings.Default.ConStr);
            var userGuid = db.AddForgottenPassword(email);

            var gr = new GeneralRespository(Properties.Settings.Default.ConStr);
            string baseUrl = Request.Url.Scheme + "://" + Request.Url.Authority + Request.ApplicationPath.TrimEnd('/');
            string link = baseUrl + "/Account/ResetPassword?token=" + userGuid.Guid;
            string html = $"Click here to reset your password: <a href='{link}'>{link}</a>";
            gr.SendEmail(email, "Reset Password", html);

            return View("ForgotPasswordSent");
        }

        public ActionResult ResetPassword(string token)
        {
            var db = new UserRepository(Properties.Settings.Default.ConStr);
            var forgottenPassword = db.GetForgottenPassword(token);
            if (forgottenPassword == null)
            {
                return Redirect("/");
            }

            if (forgottenPassword.TimeStamp.AddMinutes(2) < DateTime.Now)
            {
                return View("Expired");
            }

            return View(new ResetViewModel { Guid = forgottenPassword.Token });
        }

        [HttpPost]
        public ActionResult Reset(string password, string token)
        {
            var db = new UserRepository(Properties.Settings.Default.ConStr);
            db.ResetPassword(token, password);
            return Redirect("/");
        }

        public ActionResult CheckUserEmailExists(string email)
        {
            var db = new UserRepository(Properties.Settings.Default.ConStr);
            return Json(new { exists = db.UserEmailExists(email) }, JsonRequestBehavior.AllowGet);
        }


        //Profile
        [Authorize]
        public ActionResult ProfilePage()
        {
            return View();
        }

        private string SaveFile(HttpPostedFileBase file, string fileFolder)
        {
            if (file != null)
            {
                string fileName = file.FileName;
                file.SaveAs(Server.MapPath("~/Images/") + fileFolder + "/" + fileName);
                return fileName;
            }
            else
            {
                return "No_image_available.png";
            }
        }

        public ActionResult CheckPassword(string Password)
        {
             
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        private tbl_beis_medrash checkBeisMedrashCode(int BeisMedrashCode, string BeisMedrashName)
        {
            var db = new UserRepository(Properties.Settings.Default.ConStr);
            var bm = db.GetBeisMedrash(BeisMedrashCode, BeisMedrashName);
            return bm;
        }
    }
}