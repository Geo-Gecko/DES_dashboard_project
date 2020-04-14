var express = require('express');
var router = express.Router();
var connection = require('../config/database');

router.get('/allCoordinates/:district_name', function (req, res, next) {


    let nameOfDistrict = req.params.district_name;

    console.log(req)

    const districtSchoolsQuery = `select ft_form_11.latitude as latitude, ft_form_11.longitude as longitude, ft_form_11.region as region, ft_form_11.district as district, ft_form_11.county as county, ft_form_11.sub_county as sub_county, ft_form_11.emis_number as emis_number, ft_form_11.parish_ward as parish_ward, ft_form_11.name_of_school as name FROM  ft_form_11 WHERE ft_form_11.district ='${nameOfDistrict}'`;


    let allDistrictSchools = [];

    connection.query(districtSchoolsQuery, function (err, result) {

        result.forEach(element => {
            allDistrictSchools.push(element);
            
        });
   
        res.send({ "school": allDistrictSchools })

    });

});

router.get('/', function (req, res, next) {

///calculate logic

//Respond to the request using res

//call

res.render('district')

});

// router.get('/create', function (req, res, next) {



// });

//Get All Unique Districts
router.get('/alldistricts', function (req, res, next) {

    const districtQuery = "select distinct(ft_form_11.district) as district FROM  ft_form_11";

    let allDistricts = [];

    connection.query(districtQuery, function (err, result) {

        result.forEach(element => {
            allDistricts.push(element);
            
        });
   
        res.send({ "district": allDistricts })

    });


});



module.exports = router;