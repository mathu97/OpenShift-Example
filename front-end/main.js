var dpIP = 0
var dbPort = 0
var serverIP = 0
function connectToDB() {
    dpIP = $('#dbIP').val();
    dbPort = $('#dbPort').val();
    serverIP = $('#serverIP').val();

    var connectURL = serverIP + "/connect"
    var params = {
        databaseIP: dpIP,
        databasePort: dbPort
    }
    $.get(connectURL, params, function(data) {

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
    var connectURL = serverIP + "/createtable"
    $.post(connectURL, function(data) {

        if (data.tableCreated == true) {
            alert("Table " + data.name + " Created")
            $(".create").css("display", "none")
            $(".delete").css("display", "block")
        } else {
            alert("Unable To Create Table")
        }
    });
}

function deleteTable () {
    var connectURL = serverIP + "/deletetable"
    $.post(connectURL, function(data) {

        if (data.tableDeleted == true) {
            alert("Table " + data.name + " Deleted")
            $(".delete").css("display", "none")
            $(".create").css("display", "block")
        } else {
            alert("Unable To Delete Table")
        }
    });
}

function addRow () {
    var connectURL = serverIP + "/addRow"
    var name = $("#name").val();
    var address = $("#address").val();

    var parameters = {cust_name: name,
                  cust_address: address
            }

    $.get(connectURL, parameters, function(data) {

        if (data.rowAdded == true) {
            alert("1 Row Added")
        } else {
            alert("Unable To Add Row")
        }
    });
}

$(function(){

    $('#connectButton').click(connectToDB)

    $('#createTable').click(createTable)
    
    $('#deleteTable').click(deleteTable)

    $('#insertButton').click(addRow)

});