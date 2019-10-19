var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/:region', function(req, res, next) {


    const limit = 10;

    let nameOfREgion = req.params.region;

    const dQuery = `select distinct(details.region) as region,
    sum(inspection.attendance_of_p1_boys_on_visitation_day) as p1_boys,
    sum(inspection.attendance_of_p1_girls_on_visitation_day) as p1_girls, 
    sum(inspection.attendance_of_p2_boys_on_visitation_day) as p2_boys,
    sum(inspection.attendance_of_p2_girls_on_visitation_day) as p2_girls, 
    sum(inspection.attendance_of_p3_boys_on_visitation_day) as p3_boys,
    sum(inspection.attendance_of_p3_girls_on_visitation_day) as p3_girls, 
    sum(inspection.attendance_of_p4_boys_on_visitation_day) as p4_boys,
    sum(inspection.attendance_of_p4_girls_on_visitation_day) as p4_girls, 
    sum(inspection.attendance_of_p5_boys_on_visitation_day) as p5_boys,
    sum(inspection.attendance_of_p5_girls_on_visitation_day) as p5_girls,
    sum(inspection.attendance_of_p6_boys_on_visitation_day) as p6_boys,
    sum(inspection.attendance_of_p6_girls_on_visitation_day) as p6_girls, 
    sum(inspection.attendance_of_p7_boys_on_visitation_day) as p7_boys,
    sum(inspection.attendance_of_p7_girls_on_visitation_day) as p7_girls  
    FROM  ft_form_12  as inspection,  ft_form_11  as details
     WHERE details.submission_id=inspection.school_name group by details.region`;


    connection.query(dQuery, function fill(err, result, ) {
        if (err) throw err;
        let regionArray = [];
        let totalAttendenceBoysArray = [];
        let totalAttendenceGirlsArray = [];
        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // district
            let region = result[i].region;

            regionArray.push(region)


            // Processing boys for each school and each class
            let boysArray = [];
            for (let b = 1; b <= 7; b++) {
                let sRegion = `p${b}_boys`;
                boysArray.push(result[i][sRegion]);
            }
            totalAttendenceBoysArray.push(boysArray);

            // Processing girls for each school and each class
            let girlsArray = [];
            for (let g = 1; g <= 7; g++) {
                let sDistricts = `p${g}_girls`;
                girlsArray.push(result[i][sDistricts]);
            }
            totalAttendenceGirlsArray.push(girlsArray);

        }
        // console.log("REGION", regionArray);
        // console.log("TOTAL ATTENDENCE BOYS", totalAttendenceBoysArray );
        // console.log("TOTAL ATTENDENCE GILRS", totalAttendenceGirlsArray);


        let region = regionArray[0];
        let boysPlot = JSON.stringify(totalAttendenceBoysArray[0]);
        let girlsPlot = JSON.stringify(totalAttendenceGirlsArray[0]);

        res.send({ region: region, boys: boysPlot, girls: girlsPlot });

    })

});


module.exports = router;