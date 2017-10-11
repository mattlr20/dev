$.ajax({
    url: 'https://www.ncfunds.com/fundpages/425.htm',
    data: "action=add",                              
    dataType: 'json',
    success: function(data) {
        var data = data[0];
        $('#output').append(
        ); //Set output element html
    } //end success
}); //end ajax