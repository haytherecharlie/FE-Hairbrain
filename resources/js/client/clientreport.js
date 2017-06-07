/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
* Author: Charlie Hay
*
* CLIENT REPORT JS FUNCTIONALITY.
/******************************************/

var ReportIssue = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var reportModal   = $('.reportmodal');
var confirmReport = $('.reportmodal .confirmreport');
var reportTextBox = $('.issueform')


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

confirmReport.click(function() {
    submitForm();
});


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/



//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

function submitForm() {
    var form = new FormData();
    form.append("name", name);
    form.append("phone", phone);
    form.append("email", email);
    form.append("salon", salon);
    form.append("issue", reportTextBox.val());

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://script.google.com/macros/s/AKfycbxwK0uSZtglD0qBQKwqNOzfM-1JDMjIusr4FL3i6bkpAkL-QCOH/exec",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "data": form,
        "statusCode": {
            200: function(req, res) {
                // Do Nothing
            },
            400: function(req, res) {
                redirect('/learn/mistake/');
            },
            401: function(req, res) {
                redirect('/');
            }
        }
    }

    $.ajax(settings)

}


//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
    var Main = (function() {

        // Main

    })();

    return {

    }

})(); // END OF CLIENTREPORT.JS
