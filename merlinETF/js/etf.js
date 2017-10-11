$(document).ready(function () {
    // $.ajax({
    //     type: "GET",
    //     dataType: 'json',
    //     url: "js/ETF_425.json",
    //     success: function(result) {
    //         console.log(result);
    //         var table = $('#performance');
    //         for (var i in result) {
    //             table.append("<tr><td>" + result[i].PX_MID + "</td><td>" + result[i].PX_YEST_CLOSE + "</td><td>" + result[i].FUND_PCT_PREMIUM + "</td></tr>");
    //         }
    //     },
    //     failure: function(result) {
    //         console.log("error");
    //     }
    // });
    // var table = $('#performance');
    // // var result = [{"PX_MID":"26.985000","PX_YEST_CLOSE":"27.040000","FUND_PCT_PREMIUM":".1866894510","shares":"204000.00000","netassets":"5504315.99","seccount":"25"}];
    // for (var i in result) {
    //     table.append("<tr><td>" + result[i].PX_MID + "</td><td>" + result[i].PX_YEST_CLOSE + "</td><td>" + result[i].FUND_PCT_PREMIUM + "</td></tr>");
    // }
    if ($('#top-holdings').length > 0) {
        $.ajax({
            type: "GET",
            url: "js/holdings_425.json",
            success: function (result) {
                console.log(result);
                var table = $('#top-holdings');
                for (var i = 0; i < 10; i++) {
                    table.append(
                        "<tr><td>" + result[i].ticker + "</td><td>" + result[i].descr1 + "</td><td>" + twoDec(result[i].marketvalue) + "</td></tr>"
                    );
                }
            },
            failure: function (result) {
                console.log("error");
            }
        });
    }
    if ($('#all-holdings').length > 0) {
        $.ajax({
            type: "GET",
            url: "js/holdings_425.json",
            success: function (result) {
                console.log(result);
                var table = $('#all-holdings');
                for (var i in result) {
                    table.append(
                        "<tr><td>" + result[i].ticker + "</td><td>" + result[i].descr1 + "</td><td>" + result[i].marketvalue + "</td></tr>"
                    );
                }
            },
            failure: function (result) {
                console.log("error");
            }
        });
    }
    if ($('#pricing').length > 0) {
        $.ajax({
            type: "GET",
            url: "js/ETF_425.json",
            success: function (result) {
                console.log(result);
                var table = $('#pricing');
                for (var i in result) {
                    table.append(
                        "<tr><td>" + twoDec(result[i].PX_MID) + "</td><td>" + twoDec(result[i].PX_YEST_CLOSE) + "</td><td>" + twoDec(result[i].FUND_PCT_PREMIUM) + "</td></tr>"
                    );
                }
            },
            failure: function (result) {
                console.log("error");
            }
        });
    }
});

function twoDec(val) {
    //return parseFloat(Math.round(val * 100) / 100).toFixed(7);
    return val;
}