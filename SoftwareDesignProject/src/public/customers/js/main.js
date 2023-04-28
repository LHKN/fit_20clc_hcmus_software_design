
// Dropdown on mouse hover
// $(document).ready(function () {
//     function toggleNavbarMethod() {
//         if ($(window).width() > 992) {
//             $('.navbar .dropdown').on('mouseover', function () {
//                 $('.dropdown-toggle', this).trigger('click');
//             }).on('mouseout', function () {
//                 $('.dropdown-toggle', this).trigger('click').blur();
//             });
//         } else {
//             $('.navbar .dropdown').off('mouseover').off('mouseout');
//         }
//     }
//     toggleNavbarMethod();
//     $(window).resize(toggleNavbarMethod);
// });

$('.nav-link').click(function (event) {
    event.stopPropagation();
});

// Back to top button
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
});
$('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
});


// Vendor carousel
$('.vendor-carousel').owlCarousel({
    loop: true,
    margin: 29,
    nav: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
        0: {
            items: 2
        },
        576: {
            items: 3
        },
        768: {
            items: 4
        },
        992: {
            items: 5
        },
        1200: {
            items: 6
        }
    }
});


// Related carousel
$('.related-carousel').owlCarousel({
    loop: true,
    margin: 29,
    nav: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
        0: {
            items: 1
        },
        576: {
            items: 2
        },
        768: {
            items: 3
        },
        992: {
            items: 4
        }
    }
});


// Product Quantity
$('.quantity button').on('click', function () {
    var button = $(this);
    var oldValue = button.parent().parent().find('input').val();
    if (button.hasClass('btn-plus')) {
        var newVal = parseFloat(oldValue) + 1;
    } else {
        if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
        } else {
            newVal = 0;
        }
    }
    button.parent().parent().find('input').val(newVal);
});

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validate = () => {
    const $result = $('#result');
    const email = $('#email').val();
    $result.text('');

    if (validateEmail(email)) {
        $result.text('   ' + email + ' is valid');
        $result.css('color', 'green');
    } else {
        $result.text('   ' + email + ' is not valid');
        $result.css('color', 'red');
    }

    email ? $result.removeClass('d-none') : $result.addClass('d-none');

    return false;
}

$('#email').on('input', validate);

$('#newPass, #confirmPass').on('keyup', function () {
    if ($('#newPass').val() == $('#confirmPass').val()) {
        $('#message').html('Matching').css('color', 'green');
        $('#changePassBtn').prop('disabled', false);
    } else {
        $('#message').html('Not Matching').css('color', 'red');
        $('#changePassBtn').prop('disabled', true);
    }
});

$(document).ready(function () {
    $('#st1').click(function () {
        $('#leaveReview .fa-star').removeClass('fas').addClass('far');
        $('#st1').removeClass('far').addClass('fas');
        $('#rating').attr('value', 1);
    });
    $('#st2').click(function () {
        $('#leaveReview .fa-star').removeClass('fas').addClass('far');
        $('#st1, #st2').removeClass('far').addClass('fas');
        $('#rating').attr('value', 2);
    });
    $('#st3').click(function () {
        $('#leaveReview .fa-star').removeClass('fas').addClass('far');
        $('#st1, #st2, #st3').removeClass('far').addClass('fas');
        $('#rating').attr('value', 3);
    });
    $('#st4').click(function () {
        $('#leaveReview .fa-star').removeClass('fas').addClass('far');
        $('#st1, #st2, #st3, #st4').removeClass('far').addClass('fas');
        $('#rating').attr('value', 4);
    });
    $('#st5').click(function () {
        $('#leaveReview .fa-star').removeClass('fas').addClass('far');
        $('#st1, #st2, #st3, #st4, #st5').removeClass('far').addClass('fas');
        $('#rating').attr('value', 5);
    });
});

$(document).ready(function () {
    $('#leaveReview .fa-star').on('click', function () {
        if ($('#leaveReview').children('.fas').length !== 0) {
            $('#reviewSubmit').prop('disabled', false);
        }
    });
})
