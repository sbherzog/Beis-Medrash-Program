using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeisMedrashProgram.data
{
    public class UserRepository
    {
        private string _connectionString;

        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddBeisMedrash(tbl_beis_medrash beisMedrash)
        {
            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                context.tbl_beis_medrashes.InsertOnSubmit(beisMedrash);
                context.SubmitChanges();
            }
        }

        public void AddUser(string firstName, string lastName, string emailAddress, string password, int beisMedrashId)
        {
            string salt = PasswordHelper.GenerateSalt();
            string hash = PasswordHelper.HashPassword(password, salt);

            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                var user = new tbl_user
                {
                    Email = emailAddress,
                    FirstName = firstName,
                    LastName = lastName,
                    PasswordHash = hash,
                    PasswordSalt = salt,
                    BeisMedrashId = beisMedrashId
                };
                context.tbl_users.InsertOnSubmit(user);
                context.SubmitChanges();
            }
        }

        public tbl_user Login(string emailAddress, string password)
        {
            var user = GetUser(emailAddress);
            if (user == null)
            {
                return null;
            }

            bool isMatch = PasswordHelper.IsMatch(password, user.PasswordHash, user.PasswordSalt);
            if (isMatch)
            {
                return user;
            }

            return null;
        }

        public tbl_user GetUser(string emailAddress)
        {
            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                return context.tbl_users.FirstOrDefault(u => u.Email == emailAddress);
            }
        }

        public tbl_user GetUser(int id)
        {
            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                return context.tbl_users.FirstOrDefault(u => u.Id == id);
            }
        }

        public IEnumerable<tbl_user> GeAlltUser()
        {
            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                return context.tbl_users.ToList();
            }
        }

        public tbl_beis_medrash GetBeisMedrash(int BeisMedrashCode, string BeisMedrashName)
        {
            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                return context.tbl_beis_medrashes.FirstOrDefault(b => b.BeisMedrashCode == BeisMedrashCode && b.BeisMedrashName == BeisMedrashName);
            }
        }

        public tbl_beis_medrash GetBeisMedrashById(int id)
        {
            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                return context.tbl_beis_medrashes.FirstOrDefault(b => b.Id == id);
            }
        }

        public bool UserEmailExists(string email)
        {
            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                return context.tbl_users.Any(u => u.Email == email);
            }
        }

        //ForgottenPassword
        public UserGuid AddForgottenPassword(string email)
        {
            Guid guid = Guid.NewGuid();

            var user = GetUser(email);
            if (user == null)
            {
                return null;
            }

            var fp = new tbl_forgotten_password();
            fp.TimeStamp = DateTime.Now;
            fp.UserId = user.Id;
            fp.Token = guid.ToString();

            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                context.tbl_forgotten_passwords.InsertOnSubmit(fp);
                context.SubmitChanges();
            }

            return new UserGuid
            {
                User = user,
                Guid = guid
            };
        }

        public tbl_forgotten_password GetForgottenPassword(string token)
        {
            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                return context.tbl_forgotten_passwords.FirstOrDefault(f => f.Token == token);
            }
        }

        public void ResetPassword(string token, string password)
        {
            string salt = PasswordHelper.GenerateSalt();
            string passwordHash = PasswordHelper.HashPassword(password, salt);
            int userId = GetIdFromToken(token);

            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                context.ExecuteCommand("UPDATE tbl_users SET PasswordSalt={0}, PasswordHash={1} WHERE id = {2}", salt, passwordHash, userId);

            }
        }

        private int GetIdFromToken(string token)
        {
            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                return context.tbl_forgotten_passwords.FirstOrDefault(f => f.Token == token).UserId;
            }
        }

        public class UserGuid
        {
            public Guid Guid { get; set; }
            public tbl_user User { get; set; }
        }
    }
}