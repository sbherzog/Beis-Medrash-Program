using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace BeisMedrashProgram.data
{
    public class GeneralRespository
    {
        private string _connectionString;

        public GeneralRespository(string connectionString)
        {
            _connectionString = connectionString;
        }

        //Email
        public void SendEmail(string toEmail, string subject, string htmlBody)
        {
            var fromAddress = new MailAddress("samuel@clickitdesign.com", "From Beis Medrash Program");
            var toAddress = new MailAddress(toEmail, toEmail);
            const string fromPassword = "s3525350";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = htmlBody,
                IsBodyHtml = true
            })
            {
                smtp.Send(message);
            }
        }
    }
}
