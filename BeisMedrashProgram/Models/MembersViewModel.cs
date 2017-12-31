using BeisMedrashProgram.data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeisMedrashProgram.Models
{
    public class MembersViewModel
    {
        public IEnumerable<tbl_member> members {get; set;}
    }
}