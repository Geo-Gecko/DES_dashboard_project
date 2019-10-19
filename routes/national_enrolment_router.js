var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/:region', function(req, res, next) {


    const limit = 10;

    let nameOfRegion = req.params.region;

    const dQuery = `select distinct(details.region) as region,
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
     WHERE details.submission_id=inspection.school_name group by details.region`;


    connection.query(dQuery, function fill(err, result, ) {
        if (err) throw err;
        let regionArray = [];
        let totalEnrolmentBoysArray = [];
        let totalEnrolmentGirlsArray = [];
        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // national
            let region = result[i].region;

            regionArray.push(region)


            // Processing total number of boys in a region
            let boysArray = [];
            for (let b = 1; b <= 7; b++) {
                let sregion = `p${b}_boys`;
                boysArray.push(result[i][sregion]);
            }
            totalEnrolmentBoysArray.push(boysArray);

            // Processing total number óf girls in a given region 
            let girlsArray = [];
            for (let g = 1; g <= 7; g++) {
                let sregion = `p${g}_girls`;
                girlsArray.push(result[i][sregion]);
            }
            totalEnrolmentGirlsArray.push(girlsArray);

        }
        // console.log("REGION",  regionArray);
        // console.log("TOTAL ENROLMENT BOYS",  totalEnrolmentBoysArray );
        // console.log("TOTAL ENROLMENT GILRS",  totalEnrolmentGirlsArray);


        let region = regionArray[0];
        let boysPlot = JSON.stringify(totalEnrolmentBoysArray[0]);
        let girlsPlot = JSON.stringify(totalEnrolmentGirlsArray[0]);

        res.send({ region: region, boys: boysPlot, girls: girlsPlot });

    })

});


module.exports = router;