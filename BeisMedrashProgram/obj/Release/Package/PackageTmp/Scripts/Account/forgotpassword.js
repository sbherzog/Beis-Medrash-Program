$(function () {
    $('#submit-button').on('click', function () {
        $('#forgot-password-form .error').hide()
        form = true;
        var email = $('#email').val();
        email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email == '') {
            $('#email').closest('.form-group').find(".error").html('Please enter your email.').show();
            return false;
            return false;
        } else if (email_regex.test(email) == false) {
            $('#email').closest('.form-group').find(".error").html('Enter a valid Email.').show();
            form = false;
            return false;
        }

        var isEmailValid = false;
        $.ajax({
            async: false, type: 'GET',
            data: { email: email },
            url: '/Account/CheckUserEmailExists',
            success: function (result) {
                isEmailValid = result.exists;
                if (!isEmailValid) {
                    $('#email').closest('.form-group').find(".error").html('This email does not exists in your system.').show();
                    form = false;
                    return false;
                }
            }
        });

        if (form) {
            $('#forgot-password-form').submit();
        }
        return false;
    });
});
