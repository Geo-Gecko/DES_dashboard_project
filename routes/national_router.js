var express = require('express');
var router = express.Router();
var connection = require('../config/database');

router.get('/allCoordinates/:region_name', function (req, res, next) {


    let nameOfRegion = req.params.region_name;

    const regionSchoolsQuery = `select ft_form_11.latitude as latitude, ft_form_11.longitude as longitude, ft_form_11.region as region, ft_form_11.district as district, ft_form_11.county as county, ft_form_11.sub_county as sub_county, ft_form_11.emis_number as emis_number, ft_form_11.parish_ward as parish_ward, ft_form_11.name_of_school as name FROM  ft_form_11 WHERE ft_form_11.region ='${nameOfRegion}'`;


    let allRegionSchools = [];

    connection.query(regionSchoolsQuery, function (err, result) {

        result.forEach(element => {
            allRegionSchools.push(element);
            
        });
   
        res.send({ "school": allRegionSchools })

    });

});


router.get('/', function (req, res, next) {

///calculate logic

//Respond to the request using res

//call

res.render('national')

});

router.get('/create', function (req, res, next) {



});

//Get All Unique Regions
router.get('/allRegions', function (req, res, next) {

    const regionQuery = "select distinct(ft_form_11.region) as region FROM  ft_form_11";

    let allRegions = [];

    connection.query(regionQuery, function (err, result) {

        result.forEach(element => {
            allRegions.push(element);
            
        });
   
        res.send({ "region": allRegions })

    });


});


module.exports = router;