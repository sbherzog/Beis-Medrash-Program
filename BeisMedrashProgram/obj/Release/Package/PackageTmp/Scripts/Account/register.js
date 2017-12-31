$(function () {
    $('.upload-logo-btn').on('click', function () {
        $('.upload-logo-input').trigger('click');
    });

    $('.upload-logo-input').on('change', function () {
        if (this.files.item(0)) {
            $('.file-name').html('<span style="color:Blue; font-size:10px">File Name: ' + this.files.item(0).name + '</span>&nbsp;&nbsp;<span title="remove-file" class="btn btn-danger btn-xs remove-file">x</span>');
        } else {
            //$('.upload-logo-input').val("");
            //$('.file-name').html('');
            //$('.image-upload-display').remove();
        }
    })

    $('.upload-logo-btn').on('click', '.remove-file', function (e) {
        e.stopPropagation();
        $('.upload-logo-input').val("");
        $('.file-name').html('');
        $('.image-upload-display').remove();
    })

    $('#form-register').on('click', '.beis-medrash-already-registered', function () {
        $('.beis-medrash-sec').hide();
        $('.beis-medrash-code-sec').show()
        $('.beis-medrash-code-registered').html('<a href="#" class="beis-medrash-not-registered">Beis Medrash not Registered (Create Beis Medrash Account)</a>')
    })

    $('#form-register').on('click', '.beis-medrash-not-registered', function () {
        $('.beis-medrash-sec').show();
        $('.beis-medrash-code-sec').hide()
        $('.beis-medrash-code-registered').html('<a href="#" class="beis-medrash-already-registered">Beis Medrash already Registered (Create only new user)</a>')
    })


    $('#submit-button').on('click', function () {
        $('#form-register .error').hide()
        form = true;
        var firstName = $('#first_Name').val();
        var lastName = $('#last_name').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var passwordMatch = $('#password-match').val();
        var BeisMedrashName = $('#Beis_Medrash_Name').val();
        email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (BeisMedrashName == '') {
            $('#Beis_Medrash_Name').closest('.form-group').find(".error").html('Please enter a Beis Medrash Name.').show();
            form = false;
        }

        if (firstName == '') {
            $('#first_Name').closest('.form-group').find(".error").html('Please enter your first name.').show();
            form = false;
        }

        if (lastName == '') {
            $('#last_name').closest('.form-group').find(".error").html('Please enter your last name.').show();
            form = false;
        }

        if (email == '') {
            $('#email').closest('.form-group').find(".error").html('Please enter your email.').show();
            form = false;
        } else if (email_regex.test(email) == false) {
            $('#email').closest('.form-group').find(".error").html('Enter a valid Email.').show();
            form = false;
        }
        
        if ( $('#Beis_Medrash_Code').is(':visible') ){
            var BeisMedrashCode = $('#Beis_Medrash_Code').val();
            if (BeisMedrashCode == '') {
                $('#Beis_Medrash_Code').closest('.form-group').find(".error").html('Please enter a Beis Medrash Code.').show();
                form = false;
            }
        }

        var isEmailValid = false;
        $.ajax({
            async: false, type: 'GET',
            data: { email: email },
            url: '/Account/CheckUserEmailExists',
            success: function (result) {
                isEmailValid = result.exists;
                if (isEmailValid) {
                    $('#email').closest('.form-group').find(".error").html('This email already exists in our system.').show();
                    form = false;
                }
            }
        });

        if (password == '') {
            $('#password').closest('.form-group').find(".error").html('Please enter a password.').show();
            form = false;
        }

        if (passwordMatch == '') {
            $('#password-match').closest('.form-group').find(".error").html('Please retype your password.').show();
            form = false;
        } else if (password != passwordMatch) {
            $('#password-match').closest('.form-group').find(".error").html('Please Match your password.').show();
            form = false;
        }

        $('#submit-button').submit();

        if (form) {
            $('#form-register').submit();
        }
        return false;
    });
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        $('.image-upload-display').remove();
        reader.onload = function (e) {
            $('.upload-logo-btn').append('<img class="image-upload-display" src="' + e.target.result + '">');
        };
        reader.readAsDataURL(input.files[0]);
    }
}