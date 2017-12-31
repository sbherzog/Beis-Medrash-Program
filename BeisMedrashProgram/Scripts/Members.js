$(function () {
    $('#search_member').keyup(function () {
        var valThis = $(this).val().toLowerCase();
        if (valThis == "") {
            $('.member-row').show();
        } else {
            $('.member-row').each(function () {
                var text = $(this).text().toLowerCase();
                (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
            });
        };
    });

    $('.Add-New-Member-btn').on('click', function () {
        HideTable();
    })

    $('.cancel-btn').on('click', function () {
        var MemberId = $('#MemberId').val();
        SoweTable(MemberId)
    })

    $('.table-members').on('click', '.edit-member', function () {
        HideTable();
        var MemberId = $(this).closest('tr').attr('data-member-id');
        $.get('/Members/MemberById', { MemberId: MemberId }, function (result) {
            $.each(result, function (index, value) {
                if ($('#' + index + '').is(":checkbox") && value === 'true') {
                    $('#' + index + '').prop("checked", true);
                } else {
                    $('#' + index + '').val(value);
                }
            });
        });

    })

    $('.table-members').on('click', '.delete-member', function () {
        var MemberId = $(this).closest('tr').attr('data-member-id');
        var MemberName = $(this).closest('tr').find('.member-name').text();
        $('.activ-row').removeClass('activ-row');
        $(this).closest('tr').addClass('activ-row');
        $('#Delete_Member_Modal').find('.member-name').text(MemberName);
        $('#Delete_Member_Modal').find('.delete-member').attr('data-member-id', MemberId);
        $('#Delete_Member_Modal').modal({ show: true });
    })

    $('#Delete_Member_Modal').on('click', '.delete-member', function () {
        var MemberId = $(this).attr('data-member-id');
        $.post('/Members/DeleteMember', { MemberId: MemberId }, function () {
            getAllMembers();
        });
    })


    $('.submit-new-member-btn').on('click', function () {
        sentMemberInfo('Added');
    })

    $('.update-member-btn').on('click', function () {
        sentMemberInfo('update');
    })

    $('#filter_member_type').on('change', function () {
        getAllMembers();
    })

    getAllMembers();
})

function sentMemberInfo(ToDo) {
    $('.tools-well').find('.error-mass').hide();
    $('.side-body').find('.alert-danger').remove();
    $('.side-body').find('.alert-success').remove();

    var form = true;
    var MemberId = $('#MemberId').val();
    var EnTitle = $('#EnTitle').val();
    var EnTitle = $('#EnTitle').val();
    var LastName = $('#LastName').val();
    var FirstName = $('#FirstName').val();
        
    var HeTitle = $('#HeTitle').val();
    var HeLastName = $('#HeLastName').val();
    var HeFirstName = $('#HeFirstName').val();
    var HeSuffix = $('#HeSuffix').val();

    var AddNum = $('#AddNum').val();
    var AddStreet = $('#AddStreet').val();
    var Apt = $('#Apt').val();
    var City = $('#City').val();
    var State = $('#State').val();
    var Zip = $('#Zip').val();

    var HomePhone = $('#HomePhone').val();
    var CellPhone = $('#CellPhone').val();
    var Email = $('#Email').val();
    var Notes = $('#Notes').val();

    var Active = ($('#Active').is(':checked')) ? true : false;
    var SendEmail = ($('#SendEmail').is(':checked')) ? true : false;
    var SendStatement = ($('#SendStatement').is(':checked')) ? true : false;
    var Type = $('#Type').val();

    if (LastName == '' && HeLastName == '') {
        $('#LastName').closest('.form-group').find('.error-mass').show();
        $('#HeLastName').closest('.form-group').find('.error-mass').show();
        form = false;
    }

    if (FirstName == '' && HeFirstName == '') {
        $('#FirstName').closest('.form-group').find('.error-mass').show();
        $('#HeFirstName').closest('.form-group').find('.error-mass').show();
        form = false;
    }

    var email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (Email != '' && email_regex.test(Email) == false) {
        $('#Email').closest('.form-group').find('.error-mass').show();
        form = false;
    }
    var member = {
        MemberId: MemberId,
        EnTitle: EnTitle,
        LastName: LastName,
        FirstName: FirstName,
        HeTitle: HeTitle,
        HeLastName: HeLastName,
        HeFirstName: HeFirstName,
        HeSuffix: HeSuffix,
        AddNum: AddNum,
        AddStreet: AddStreet,
        Apt: Apt,
        City: City,
        State: State,
        Zip: Zip,
        HomePhone: HomePhone,
        CellPhone: CellPhone,
        Email: Email,
        Notes: Notes,
        Active: Active,
        SendEmail: SendEmail,
        SendStatement: SendStatement,
        Type: Type
    }

    if (form) {
        $.ajax({
            type: "POST", url: "/Members/AddUpdateMember/", data: { member: member, ToDo: ToDo },
            success: function (MemberId) {
                SoweTable(MemberId);
                $('.tools-well').after('<div class="alert alert-success alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><i class="fa fa-check-circle"></i> ' + FirstName + ' ' + LastName + ' was success ' + ToDo + '.</div>');
            }
        });
    } else {
        $('.tools-well').after('<div class="alert alert-danger alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <i class="fa fa-exclamation-circle"></i> Error: Some fields are empty or contain an improper value.</div>');
        return false;
    }
};


function SoweTable(MemberId) {
    getAllMembers(MemberId);
    $("#members-form")[0].reset();
    $('.form-members').hide();
    $('.cancel-btn').hide();
    $('.submit-new-member-btn').hide();
    $('.update-member-btn').hide()
    $('.table-members').show();
    $('.Add-New-Member-btn').show();
    $('.tools-well').find('.error-mass').hide();
    $('.side-body').find('.alert-danger').remove();
    $('.side-body').find('.alert-success').remove();
    $('.search-member-sec').show();
    $('.filter-member-type').show();     
}

function HideTable(){
    $('.form-members').show();
    $('.cancel-btn').show();
    $('.update-member-btn').show();
    $('.table-members').hide();
    $('.Add-New-Member-btn').hide();
    $('.search-member-sec').hide();
    $('.filter-member-type').hide();
}

function getAllMembers(MemberId) {
    $('.activ-row').removeClass('activ-row');
    $('.table-members').find('tbody').html('');

    var type = $('#filter_member_type').val();
    $.get('/Members/GetAllMembers', { type: type}, function (result) {
        var num = result.length;
        if (num == '') {
            $('.table-members').find('tbody').append('<tr class="no-members"><td colspan="5"><center>No Members Found</center></td></tr>');
            return false;
        }

        result.forEach(m => {
            var activ_link = (MemberId == m.MemberId) ? "activ-row" : "";
            var isActive = (m.Active == 'true') ? '<i class="fa fa-check"></i> ' :'';
            var TotalBalance = formatCurrency( m.TotalBalance );
            var row = `<tr class="member-row ${activ_link}" data-member-id="${m.MemberId}">
                <td class ="member-name">${isActive} ${m.EnTitle} ${m.FirstName} ${m.LastName}</td>
                <td>${m.HeTitle} ${m.HeFirstName} ${m.HeLastName} ${m.HeSuffix}</td>
                <td>${m.CellPhone}</td>
                <td>${TotalBalance}</td>
                <td>
                     <a href"#" class ="btn btn-success btn-xs edit-member">Edit</a>
                     <a href"#" class ="btn btn-danger btn-xs delete-member">Delete</a>
                </td>
            </tr>`;
            $('.table-members').find('tbody').append(row);
        })
    });
}


function formatCurrency(num) {
    num = num || '0';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
        num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + '$' + num + '.' + cents);
}





//Input Exel File
var oFileIn;

$(function () {
    oFileIn = document.getElementById('my_file_input');
    //oFileIn.addEventListener('change', filePicked, false);
});

function filePicked(oEvent) {
    // Get The File From The Input
    var oFile = oEvent.target.files[0];
    var sFilename = oFile.name;
    // Create A File Reader HTML5
    var reader = new FileReader();

    // Ready The Event For When A File Gets Selected
    reader.onload = function (e) {
        var data = e.target.result;
        var cfb = XLS.CFB.read(data, { type: 'binary' });
        var wb = XLS.parse_xlscfb(cfb);

        // Loop Over Each Sheet
        wb.SheetNames.forEach(function (sheetName) {
            // Obtain The Current Row As CSV
            var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
            var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);

            console.log(oJS)

            $.each(oJS, function (key, value) {


                var tbl_members = value;
                $.ajax({
                    type: "POST", url: "/Members/AddNewMember/", data: tbl_members,
                    success: function (result) {
                        //getAllMembers();
                        console.log(tbl_members)
                    },
                    error: function (error) {
                        alert("failed in opening XML file !!!");
                    }
                });
            });


        });

    };

    // Tell JS To Start Reading The File.. You could delay this if desired
    reader.readAsBinaryString(oFile);
}
