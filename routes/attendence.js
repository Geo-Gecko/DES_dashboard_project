var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/:name_of_school', function(req, res, next) {


    const limit = 10;

    let nameOfSchool = req.params.name_of_school;

    const aQuery = `SELECT inspection.school_name, details.name_of_school as name_of_school, 
    details.emis_number as emis_number, inspection.attendance_of_p1_boys_on_visitation_day  as p1boys, 
    inspection.attendance_of_p1_girls_on_visitation_day  as p1girls,
     inspection.attendance_of_p2_boys_on_visitation_day  as p2boys, 
     inspection.attendance_of_p2_girls_on_visitation_day  as p2girls,
      inspection.attendance_of_p3_boys_on_visitation_day  as p3boys, 
      inspection.attendance_of_p3_girls_on_visitation_day  as p3girls,
       inspection.attendance_of_p4_boys_on_visitation_day  as p4boys, 
       inspection.attendance_of_p4_girls_on_visitation_day  as p4girls,
        inspection.attendance_of_p5_boys_on_visitation_day  as p5boys, 
        inspection.attendance_of_p5_girls_on_visitation_day  as p5girls,
         inspection.attendance_of_p6_boys_on_visitation_day  as p6boys, 
         inspection.attendance_of_p6_girls_on_visitation_day  as p6girls, 
         inspection.attendance_of_p7_boys_on_visitation_day  as p7boys, 
         inspection.attendance_of_p7_girls_on_visitation_day  as p7girls 
         FROM ft_form_12 as inspection, ft_form_11 as details 
         WHERE details.submission_id=inspection.school_name 
         and details.emis_number='${nameOfSchool}' group by details.name_of_school;`;


    connection.query(aQuery, function fill(err, result, ) {
        if (err) throw err;
        let EmisNumberArray = [];
        let attendenceBoysArray = [];
        let attendenceGirlsArray = [];
        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // School
            let emisNumer = result[i].emis_number;

            EmisNumberArray.push(emisNumer)


            // Processing boys for each school and each class
            let boysArray = [];
            for (let b = 1; b <= 7; b++) {
                let sClass = `p${b}boys`;
                boysArray.push(result[i][sClass]);
            }
            attendenceBoysArray.push(boysArray);

            // Processing girls for each school and each class
            let girlsArray = [];
            for (let g = 1; g <= 7; g++) {
                let sClass = `p${g}girls`;
                girlsArray.push(result[i][sClass]);
            }
            attendenceGirlsArray.push(girlsArray);

        }

        console.log("Attendence", attendenceBoysArray);
        console.log("Attendence girls", attendenceGirlsArray);
        console.log("Emis", EmisNumberArray);

        let EmisNumber = EmisNumberArray[0];
        let boysPlot = JSON.stringify(attendenceBoysArray[0]);
        let girlsPlot = JSON.stringify(attendenceGirlsArray[0]);

        res.send({ Emis: EmisNumber, boys: boysPlot, girls: girlsPlot });

    })

});


module.exports = router;