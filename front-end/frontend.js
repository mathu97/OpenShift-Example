function connectToDB() {
    var dpIP = $('#dbIP').val();
    var dbPort = $('#dpPort').val();
    var serverIP = $('#serverIP').val();

    var connectURL = serverIP + "/connect"
    $.get(connectURL, {databaseIP: dpIP, databasePort: dpPort}, function(data) {

        if (data.Connected == true) {
            alert("Connected To Database")
            $("#connectionForm").css("display", "none")
            $('#databaseForm').css("display", "block")
        } else {
            alert("Unable to Connect To Database")
        }
    });
}

function createTable () {
    $.get(connectURL, function(data) {

        if (data.Connected == true) {
            alert("Connected To Database")
            $("#connectionForm").css("display", "none")
            $('#databaseForm').css("display", "block")
        } else {
            alert("Unable to Connect To Database")
        }
    });
}

$(function(){

    $('#connectButton').click(function() {
        connectToDB();
    });

    $('#createTable').click(function() {
        createTable();
    });


});