$(function () {
    $(".beis-medrash-logo").colorbox({ maxHeight: "40%", maxWidth: "60%", 'photo': true });

    $('.reset-profile').on('click', function () {
        $('#profile-form')[0].reset();
        $('#profile-form .error').hide()
        $('#profile-form').siblings('.alert-danger').remove();
    })

    $('.reset-beis-medrash').on('click', function () {
        $('#beis-medrash-form')[0].reset();
        $('.beis-medrash-logo').attr('href', '/Images/BeisMedrashLogos/' + $('.beis-medrash-logo-input').attr('data-orig'));
        $('.beis-medrash-logo-image').attr('src', '/Images/BeisMedrashLogos/' + $('.beis-medrash-logo-input').attr('data-orig'));
    })

    $('#profile-form').find('input').on('blur', function () {
        $('#profile-form').siblings('.alert-danger').remove();
        $('#profile-form').find('input').each(function () {
            if ($(this).attr('data-orig') != $(this).val() ) {
                $('#profile-form').before('<div class="alert alert-danger">Please update to save your changes</div>');
                return false;
            }
        });
    })

    $('#beis-medrash-form').find('input').on('blur', function () {
        $('#beis-medrash-form').siblings('.alert-danger').remove();
        $('#beis-medrash-form').find('input').not('.beis-medrash-logo-input').each(function () {
            if ($(this).attr('data-orig') != $(this).val()) {
                $('#beis-medrash-form').before('<div class="alert alert-danger">Please update to save your changes</div>');
                return false;
            }
        });
    })

    //Uploade Image
    $('.beis-medrash-logo-upload-btn').on('click', function () {
        $('.beis-medrash-logo-input').trigger('click');
    })

    $('.beis-medrash-logo-input').on('change', function (e) {
        if (this.files.item(0)) {
            var file_size = this.files[0].size;
            if (file_size > 8000000) {
                var your_file_size = Math.round(file_size / 100000);
                alert('Sorry, your image file is to big!' + "\n" + 'Image File has to be less then 80MB' + "\n" + 'Your file size: ' + your_file_size + 'MB');
                return false;
            }
        } else {
            var gg = $('.beis-medrash-logo').attr('href');
            $('.beis-medrash-logo').attr('href', '/Images/BeisMedrashLogos/' + $('.beis-medrash-logo-input').attr('data-orig'));
            $('.beis-medrash-logo-image').attr('src', '/Images/BeisMedrashLogos/' + $('.beis-medrash-logo-input').attr('data-orig'));
        }
    })

    $('#updateInfo').on('shown.bs.modal', function (e) {
        $(this).find('input').focus();
    })

    $('#updateInfo').on('hidden.bs.modal', function (e) {
        $(this).find('.modal-body').find('.alert').remove();
        $(this).find('input').val('');
    })

    $('#update_profile').on('click', function () {
        updateProfile('profile-form');
    })

    $('#update_beis_medrash').on('click', function () {
        updateProfile('beis-medrash-form');
    })

    $("#current_password").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            $('#updateInfo').find('.btn-primary').trigger('click');
        }
    });
})

function updateProfile(formName) {
    $('#updateInfo').find('.modal-body').find('.alert').remove();
    var CP = $('#current_password').val();
    if (CP === '') {
        $('#updateInfo').find('.modal-body').prepend('<div class="alert alert-danger alert-dismissable" style="padding:5px; text-align: center">Please Enter your Password</div>');
        return false;
    } else {
        $.get('/Account/CheckPassword/', { currentPassword: CP }, function (result) {
            if (result == "True") {
                console.log(formName)
                $('#'+ formName + '').submit();
                $('#updateInfo').modal('hide');
            } else {
                $('#updateInfo').find('.modal-body').prepend('<div class="alert alert-danger alert-dismissable" style="padding:5px; text-align: center">Incorrect Password</div>');
            }
        })
    }
}

function updateInfo(type) {
    if (type == 'profile') {
        checkProfileInfo();
    } else {
        checkBeisMedrashInfo();
    }
}

function checkBeisMedrashInfo() {
    $('#beis-medrash-form .error').hide()
    form = true;
    var BeisMedrashName = $('#Beis_Medrash_Name').val();

    if (BeisMedrashName == '') {
        $('#Beis_Medrash_Name').closest('.form-group').find(".error").html('Please enter a Beis Medrash Name.').show();
        form = false;
    }

    if (form) {
        $('#updateInfo').modal('show');
        $('#update_profile').hide();
        $('#update_beis_medrash').show();
        $('#updateInfo').find('.modal-title').text('Update Beis Medrash Info')
    }
}


function checkProfileInfo(){
    $('#profile-form .error').hide()
    form = true;
    var firstName = $('#first_Name').val();
    var lastName = $('#last_name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    
    var oldEmail = $('#email').attr('data-orig');
    if (oldEmail != email) {
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
    }

    if (password == '') {
        $('#password').closest('.form-group').find(".error").html('Please enter a password.').show();
        form = false;
    }

    if (form) {
        $('#updateInfo').modal('show');
        $('#update_beis_medrash').hide();
        $('#update_profile').show();
        $('#updateInfo').find('.modal-title').text('Update Your Profile')
    }
    return false;
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.beis-medrash-logo-image').attr('src', e.target.result);
            $('.beis-medrash-logo').attr('href', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}