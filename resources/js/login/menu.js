var Menu = (function() {

    var hamburger     = $('.hamburger');
    var menuModal     = $('.menumodal');
    var register      = $('#register');
    var registerModal = $('.registermodal');

    hamburger.click(function() {
        menuModal.modal('show');
    });

    register.click(function() {
        menuModal.modal('hide');
        registerModal.modal('show');
    });



})();
