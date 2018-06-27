function connectToDB() {
    var dpIP = $('#dbIP').val();
    var serverIP = $('#serverIP').val();

    var connectURL = serverIP + "/connect"
    $.get(connectURL, {databaseIP: dpIP}, function(data) {

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
        // When the connect button is clicked, connect to the database
        connectToDB();
    });
});