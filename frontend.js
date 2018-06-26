function connectToDB() {
    var dpIP = $('#dbIP').val();
    var serverIP = $('#serverIP').val();

    var connectURL = serverIP + "/connect"
    $.get(connectURL, {databaseIP: dpIP}, function(data) {
        console.log(data)
    });
}

$(function(){

    $('#connectButton').click(function() {
        //When the connect button is clicked
        connectToDB();
        
    });
});