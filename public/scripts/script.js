var minChicken = 1;
var minWings = 6;
var minFillets = 2;
var minBfly = 1;
var minThighs = 4;

$(function () {
    //hang on event of form with id=myform
    $("#wasteForm").submit(function (e) {

        //prevent Default functionality
        e.preventDefault();

        //get the action-url of the form
        console.log($("#wasteForm").serializeJSON())
        var obj = $("#wasteForm").serializeJSON()

        //do your own request an handle the results
        $.ajax({
            url: 'api/waste',
            type: 'post',
            dataType: "JSON",
            data: obj,
            success: function (data) {
                $('#waste').empty;
                $('#waste').append(data);
            }
        });

    });

});

function predict() {
    var customerNum = document.getElementById('customers').value;
    var customerLow = customerNum - 3;
    var customerHi = customerLow + 6;

    console.log(customerLow + " " + customerHi)
    $.ajax({
        url: 'api/waste',
        type: 'get',
        success: function (res) {
            console.log(res);

            var count = 0;

            var chicken = 0;
            var wings = 0;
            var fillets = 0;
            var bfly = 0;
            var thighs = 0;




            $('#results').empty();
            $.each(res, function (index, item) {
                console.log(item);

                for (var i = 0; i < (item.Hour).length; i++) {

                    if (item.Hour[i].Customers >= customerLow && item.Hour[i].Customers < customerHi) {

                        console.log(item.Hour[i].Customers);

                        console.log(item.Hour[i].Time)

                        chicken += item.Hour[i].Chicken;
                        wings += item.Hour[i].Wings;
                        fillets += item.Hour[i].Fillets;
                        bfly += item.Hour[i].DoubleBreast;
                        thighs += item.Hour[i].Thighs;

                        if (item.Hour[i].Time == "20:00" || item.Hour[i].Time == "21:00" || item.Hour[i].Time == "22:00") {
                            console.log("hit")
                            chicken + -2;
                            wings + -5;
                            fillets + -3;
                            bfly -= 6;
                            thighs + -4;
                        };

                        count += 1;
                    };
                };

            });

            resultChicken = customerCheck(customerNum, Math.floor(chicken / count), "chicken");
            resultWings = customerCheck(customerNum, multiple(Math.floor(wings / count), 2), "wings");
            resultFillets = customerCheck(customerNum, Math.floor(fillets / count), "fillets");
            resultBfly = customerCheck(customerNum, Math.floor(bfly / count), "bfly");
            resultThighs = customerCheck(customerNum, multiple(Math.floor(thighs / count), 2), "thighs");



            html = ''

            html += '<h5>To have enough for ' + customerNum + ' customers, you should cook..'

            html += '<table class = "table"><thead><tr><th scope="col">Chicken</th><th scope="col">Wings</th><th scope="col">Fillets</th><th scope="col">Double Breast</th><th scope="col">Thighs</th></td></thead>'
            html += '<tbody><td>' + resultChicken + '<td>' + resultWings + '</td><td>' + resultFillets + '</td><td>' + resultBfly + '</td><td>' + resultThighs + '</tr></tbody></table>'
            $('#results').append(html);
        }
    });
};

function multiple(item, divider) {
    if ((item % divider) == 0) {
        return item;
    } else {
        item = item - 1;
        multiple(item, divider);
        return item;
    }
}

function customerCheck(customerNum, x, itemName) {
    if (customerNum < x && customerNum > 10){
         if (itemName == "fillets") {
            return customerNum - 5;
        } else if (itemName == "bfly") {
            return customerNum - 4;
    }
}

    if (customerNum <= 10) {
        if (itemName == "chicken") {
            if (customerNum > 5) {
                return minChicken + 1;
            } else {
                return minChicken;
            }
        } else if (itemName == "fillets") {
            return minFillets;
        } else if (itemName == "wings") {
            return minWings;
        } else if (itemName == "thighs") {
            return minThighs;
        } else if (itemName == "bfly") {
            if (customerNum > 5) {
                return minBfly + 2;
            } else {
                return minBfly;
            }
        } else {
            return x;
        };
    } else return x;
    };