$(function () {
    $('.reset-profile').on('click', function () {
        $('#profile-form')[0].reset();
        $('#profile-form').siblings('.alert-danger').remove();
    })

    $('.reset-beis-medrash').on('click', function () {
        $('#beis-medrash-form')[0].reset();
        $('.beis-medrash-logo-image').attr('src', '/Images/BeisMedrashLogos/'+$('.beis-medrash-logo-input').attr('data-orig'));
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
    $('.beis-medrash-logo-image').on('click', function () {
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
            $('.beis-medrash-logo-image').attr('src', '/Images/BeisMedrashLogos/' + $('.beis-medrash-logo-input').attr('data-orig'));
        }
    })


    $('#updateInfo').on('hidden.bs.modal', function (e) {
        $(this).find('.modal-body').find('.alert').remove();
        $(this).find('input').val('');
    })


    $('#update_profile').on('click', function () {
        $('#updateInfo').find('.modal-body').find('.alert').remove();
        var CP = $('#current_password').val();
        if (CP === '') {
            $('#updateInfo').find('.modal-body').prepend('<div class="alert alert-danger alert-dismissable" style="padding:5px; text-align: center">Please Enter your Password</div>');
            return false;
        } else {
            $.get('/Account/CheckPassword/', { Password: CP }, function (result) {
                alert(result)
            })
        }
    })
})

function updateInfo(type) {
    $('#updateInfo').modal('show');
    if (type == 'profile') {
        $('#update_beis_medrash').hide();
        $('#update_profile').show();
        $('#updateInfo').find('.modal-title').text('Update Your Profile')
         
    } else {
        $('#update_profile').hide();
        $('#update_beis_medrash').show();
        $('#updateInfo').find('.modal-title').text('Update Beis Medrash Info')
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.beis-medrash-logo-image').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}