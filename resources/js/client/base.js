var userid      = $.cookie('userid'),
    jwt         = $.cookie('jwt'),
    clients     = [];
    apiurl     = 'http://localhost:8080/';

function cookieCheck() {
    if(!userid || !jwt) {
        window.location.href = window.location.origin + '/';
        return false;
    }
}

function openModal() {
    $('.modal').modal('show');
}

function closeModal(modal) {
    $('.modal').modal('hide');
}
