using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeisMedrashProgram.data
{
    public class MembersRepository
    {
        private string _connectionString;

        public MembersRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IEnumerable<tbl_member> GeAlltMembers(int BeisMedrashId, string type)
        {
            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                if (type == "am")
                {
                    return context.tbl_members.Where(m => m.BeisMedrashId == BeisMedrashId && m.Active == "true").ToList();
                }
                else if (type == "s")
                {
                    return context.tbl_members.Where(m => m.BeisMedrashId == BeisMedrashId && m.Type == "שכנים").ToList();
                }
                else if (type == "m")
                {
                    return context.tbl_members.Where(m => m.BeisMedrashId == BeisMedrashId && m.Type == "מתפלל").ToList();
                }
                return context.tbl_members.Where(m => m.BeisMedrashId == BeisMedrashId).ToList();
            }
        }

        public tbl_member MemberById(int MemberId)
        {
            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                return context.tbl_members.FirstOrDefault(m => m.MemberId == MemberId);
            }
        }

        public void AddNewMember(tbl_member member)
        {
            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                context.tbl_members.InsertOnSubmit(member);
                context.SubmitChanges();
            }
        }

        public void UpdateMember(tbl_member m)
        {
            using (var sqlConnection = new SqlConnection(_connectionString))
            using (var cmd = sqlConnection.CreateCommand())
            {
                object EnTitle = (m.EnTitle != null) ? m.EnTitle : (object)DBNull.Value;
                object LastName = (m.LastName != null) ? m.LastName : (object)DBNull.Value;
                object FirstName = (m.FirstName != null) ? m.FirstName : (object)DBNull.Value;

                object HeTitle = (m.HeTitle != null) ? m.HeTitle : (object)DBNull.Value;
                object HeLastName = (m.HeLastName != null) ? m.HeLastName : (object)DBNull.Value;
                object HeFirstName = (m.HeFirstName != null) ? m.HeFirstName : (object)DBNull.Value;
                object HeSuffix = (m.HeSuffix != null) ? m.HeSuffix : (object)DBNull.Value;

                object AddStreet = (m.AddStreet != null) ? m.AddStreet : (object)DBNull.Value;
                object Apt = (m.Apt != null) ? m.Apt : (object)DBNull.Value;
                object City = (m.City != null) ? m.City : (object)DBNull.Value;
                object State = (m.State != null) ? m.State : (object)DBNull.Value;
                object Zip = (m.Zip != null) ? m.Zip : (object)DBNull.Value;

                object CellPhone = (m.CellPhone != null) ? m.CellPhone : (object)DBNull.Value;
                object HomePhone = (m.HomePhone != null) ? m.HomePhone : (object)DBNull.Value;
                object Email = (m.Email != null) ? m.Email : (object)DBNull.Value;
                object Notes = (m.Notes != null) ? m.Notes : (object)DBNull.Value;

                object Active = (m.Active != null) ? m.Active : (object)DBNull.Value;
                object SendEmail = (m.SendEmail != null) ? m.SendEmail : (object)DBNull.Value;
                object Type = (m.Type != null) ? m.Type : (object)DBNull.Value;
                object SendStatement = (m.SendStatement != null) ? m.SendStatement : (object)DBNull.Value;

                cmd.CommandText = "UPDATE tbl_members SET EnTitle=@EnTitle, LastName=@LastName, FirstName=@FirstName, HeTitle=@HeTitle, HeLastName=@HeLastName, HeFirstName=@HeFirstName, HeSuffix=@HeSuffix, AddStreet=@AddStreet, Apt=@Apt, City=@City, State=@State, Zip=@Zip, CellPhone=@CellPhone, HomePhone=@HomePhone, Email=@Email, Notes=@Notes, Active=@Active, SendEmail=@SendEmail, Type=@Type, SendStatement=@SendStatement WHERE MemberId = @id";
                cmd.Parameters.AddWithValue("@id", m.MemberId);

                cmd.Parameters.AddWithValue("@EnTitle", EnTitle);
                cmd.Parameters.AddWithValue("@LastName", LastName);
                cmd.Parameters.AddWithValue("@FirstName", FirstName);

                cmd.Parameters.AddWithValue("@HeTitle", HeTitle);
                cmd.Parameters.AddWithValue("@HeLastName", HeLastName);
                cmd.Parameters.AddWithValue("@HeFirstName", HeFirstName);
                cmd.Parameters.AddWithValue("@HeSuffix", HeSuffix);

                cmd.Parameters.AddWithValue("@AddStreet", AddStreet);
                cmd.Parameters.AddWithValue("@Apt", Apt);
                cmd.Parameters.AddWithValue("@City", City);
                cmd.Parameters.AddWithValue("@State", State);
                cmd.Parameters.AddWithValue("@Zip", Zip);

                cmd.Parameters.AddWithValue("@CellPhone", CellPhone);
                cmd.Parameters.AddWithValue("@HomePhone", HomePhone);
                cmd.Parameters.AddWithValue("@Email", Email);
                cmd.Parameters.AddWithValue("@Notes", Notes);

                cmd.Parameters.AddWithValue("@Active", Active);
                cmd.Parameters.AddWithValue("@SendEmail", SendEmail);
                cmd.Parameters.AddWithValue("@Type", Type);
                cmd.Parameters.AddWithValue("@SendStatement", SendStatement);
                sqlConnection.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void DeleteMember(int MemberId)
        {
            using (var context = new BeisMedrashDBDataContext(_connectionString))
            {
                context.ExecuteCommand("DELETE FROM tbl_members WHERE MemberId = {0}", MemberId);
            }
        }
    }
}
