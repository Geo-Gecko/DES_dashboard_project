var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/:district', function(req, res, next) {


    const limit = 10;

    let nameOfDistrict = req.params.district;

    const dQuery = `select distinct(details.district) as district,
    sum(inspection.number_of_boys_enrolled_in_p1) as p1_boys,
    sum(inspection.number_of_girls_enrolled_in_p1) as p1_girls, 
    sum(inspection.number_of_boys_enrolled_in_p2) as p2_boys, 
    sum(inspection.number_of_girls_enrolled_in_p2) as p2_girls,
     sum(inspection.number_of_boys_enrolled_in_p3) as p3_boys, 
     sum(inspection.number_of_girls_enrolled_in_p3) as p3_girls,
      sum(inspection.number_of_boys_enrolled_in_p4) as p4_boys,
       sum(inspection.number_of_girls_enrolled_in_p4) as p4_girls,
        sum(inspection.number_of_boys_enrolled_in_p5)as p5_boys, 
        sum(inspection.number_of_girls_enrolled_in_p5) as p5_girls, 
        sum(inspection.number_of_boys_enrolled_in_p6) as p6_boys, 
    sum(inspection.number_of_girls_enrolled_in_p6) as p6_girls, 
    sum(inspection.number_of_boys_enrolled_in_p7) as p7_boys, 
    sum(inspection.number_of_girls_enrolled_in_p7) as p7_girls 
     FROM  ft_form_12  as inspection,  ft_form_11  as details 
     WHERE details.submission_id=inspection.school_name group by details.district`;


    connection.query(dQuery, function fill(err, result, ) {
        if (err) throw err;
        let districtArray = [];
        let totalEnrolmentBoysArray = [];
        let totalEnrolmentGirlssArray = [];
        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // district
            let district = result[i].district;

            districtArray.push(district)


            // Processing boys for each school and each class
            let boysArray = [];
            for (let b = 1; b <= 7; b++) {
                let sDistrict = `p${b}_boys`;
                boysArray.push(result[i][sDistrict]);
            }
            totalEnrolmentBoysArray.push(boysArray);

            // Processing girls for each school and each class
            let girlsArray = [];
            for (let g = 1; g <= 7; g++) {
                let sDistricts = `p${g}_girls`;
                girlsArray.push(result[i][sDistricts]);
            }
            totalEnrolmentGirlssArray.push(girlsArray);

        }
        // console.log("DISTRICT",districtArray);
        // console.log("TOTAL ENROLMENT BOYS",  totalEnrolmentBoysArray );
        // console.log("TOTAL ENROLMENT GILRS",  totalEnrolmentGirlssArray);


        let district = districtArray[0];
        let boysPlot = JSON.stringify(totalEnrolmentBoysArray[0]);
        let girlsPlot = JSON.stringify(totalEnrolmentGirlssArray[0]);

        res.send({ district: district, boys: boysPlot, girls: girlsPlot });

    })

});


module.exports = router;