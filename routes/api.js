const express = require('express');
const router = express.Router();


const Waste = require('../models/waste')



//----------------------Get Home Page----------------------//
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Food Waste',
        helpers: {
            times: function(times, opts) {
                var out = "";
                var i;
                var data = {};

                if (times) {
                    for (i = 0; i < times; i += 1) {
                        data.index = i;
                        out += opts.fn(this, {
                            data: data
                        });
                    }
                } else {

                    out = opts.inverse(this);
                }

                return out;
            }
        }
    });
});


//Get all results with customers within range#

//https://stackoverflow.com/questions/42336077/how-to-do-a-range-query-in-mongoose

router.get('/waste:customers', function(req,res,next){
    var cust = req.params.customers
    var cust = parseInt(cust)
console.log (cust)

    console.log("high is " +(cust-5))

    Waste.find({
        "Hour.Customers":{$gte :  (cust -5)},
        "Hour.Customers":{$lte :  (cust -5)},
    }).then(function (list){
            console.log(list);
            res.json(list);
        });
});


//get the last 5 waste days from the database
router.get('/waste', function(req, res, next) {
    Waste.find().sort({ _id: -1 }).limit(10).then(function(wasteList) {
        res.json(wasteList); //temp
        console.log("hi");
    });

});

//Add a day of waste to the database
router.post('/waste', function(req, res, next) {
    console.log(req.body)
    Waste.create(req.body).then(function(waste) { //creates new instance and saves to db
        res.send(waste); //send back to confirm
    }).catch(next);
});

//delete a day of waste from the database
router.delete('/waste/:id', function(req, res, next) {
    Waste.findByIdAndRemove({ _id: req.params.id }).then(function(waste) {
        res.send(waste);
    });
});

module.exports = router;