var userid      = $.cookie('userid'),
    jwt         = $.cookie('jwt'),
    clients     = [];
    apiurl     = 'http://localhost:8080/';

function openModal() {
    $('.modal').modal('show');
}

function closeModal(modal) {
    $('.modal').modal('hide');
}
