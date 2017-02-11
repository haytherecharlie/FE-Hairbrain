var data = new window.FormData($('#uploadForm')[0]),
	userid  = '589ec267f26edc18857838cb',
    jwt     = 'bWF0dC5hcy5yb3NzQGdtYWlsLmNvbTpRdTFudDBuMTIz';

$.ajax({
    xhr: function () {  
        return $.ajaxSettings.xhr();
    },
    url: 'http://localhost:8080/client/all/' + userid,
    type: "GET",
    beforeSend: function (xhr) {
		xhr.setRequestHeader ("Authorization", "Basic " + jwt);
	},
    success: function(res) {
    	console.log(res);
		},
	fail: function(err) {  
        console.error(err);
    }
});