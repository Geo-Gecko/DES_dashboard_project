var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/:name_of_school', function(req, res, next) {


    const limit = 10;

    let nameOfSchool = req.params.name_of_school;

    const aQuery = `SELECT inspection.school_name, details.name_of_school as name_of_school, 
    inspection.date_of_inspection as date_of_inspection, inspection.attendance_of_p1_boys_on_visitation_day +
    inspection.attendance_of_p2_boys_on_visitation_day  +
    inspection.attendance_of_p3_boys_on_visitation_day +
    inspection.attendance_of_p4_boys_on_visitation_day  +
    inspection.attendance_of_p5_boys_on_visitation_day +
    inspection.attendance_of_p6_boys_on_visitation_day  +
    inspection.attendance_of_p7_boys_on_visitation_day  as boys_vd,
    inspection.attendance_of_p1_girls_on_visitation_day +
     inspection.attendance_of_p2_girls_on_visitation_day +
      inspection.attendance_of_p3_girls_on_visitation_day +
       inspection.attendance_of_p4_girls_on_visitation_day +
        inspection.attendance_of_p5_girls_on_visitation_day +
         inspection.attendance_of_p6_girls_on_visitation_day +
         inspection.attendance_of_p7_girls_on_visitation_day as girls_vd, 
        inspection.number_of_boys_enrolled_in_p1+
        inspection.number_of_boys_enrolled_in_p2  +
        inspection.number_of_boys_enrolled_in_p3 +
        inspection.number_of_boys_enrolled_in_p4 +
        inspection.number_of_boys_enrolled_in_p5 +
        inspection.number_of_boys_enrolled_in_p6  + 
        inspection.number_of_boys_enrolled_in_p7  as boys_enrol,
        inspection. number_of_girls_enrolled_in_p1 + 
        inspection.number_of_girls_enrolled_in_p2  +     
       inspection.number_of_girls_enrolled_in_p3  +   
       inspection.number_of_girls_enrolled_in_p4  +   
        inspection.number_of_girls_enrolled_in_p5 +
        inspection.number_of_girls_enrolled_in_p6  +   inspection.number_of_girls_enrolled_in_p7  as girls_enrol
         FROM ft_form_12 as inspection, ft_form_11 as details 
         WHERE details.submission_id=inspection.school_name and details.name_of_school ='${nameOfSchool}'
         group by details.name_of_school, inspection.date_of_inspection;`;


    connection.query(aQuery, function fill(err, result, ) {
        if (err) throw err;
        let SchoolArray= [];
        let enrolmentBoysArray = [];
        let enrolmentGirlsArray = [];
        let attendenceBoysArray = [];
        let attendenceGirlsArray = [];
        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // School
            let school = result[i]. name_of_school;
            SchoolArray.push(school)


            // Processing boys for each school and each class
            let boysArrayAttend = [];
            for (let b = 1; b <= 1; b++) {
                let sClass = `boys_vd`;
                boysArrayAttend.push(result[i][sClass]);
            }
            attendenceBoysArray.push(boysArrayAttend);

            // Processing girls for each school and each class
            let girlsArrayAttend = [];
            for (let g = 1; g <= 1; g++) {
                let sClass = `girls_vd`;
                girlsArrayAttend.push(result[i][sClass]);
            }
            attendenceGirlsArray.push(girlsArrayAttend);

             // Processing girls for each school and each class
             let girlsArrayEnrol = [];
             for (let g = 1; g <= 1; g++) {
                 let sClass = `girls_enrol`;
                 girlsArrayEnrol.push(result[i][sClass]);
             }
             enrolmentGirlsArray.push(girlsArrayEnrol);

              // Processing girls for each school and each class
              let boysArrayEnrol = [];
              for (let g = 1; g <= 1; g++) {
                  let sClass = `boys_enrol`;
                  boysArrayEnrol.push(result[i][sClass]);
              }
              enrolmentBoysArray.push(boysArrayEnrol);

        }

        console.log("Attendence", attendenceBoysArray);
        console.log("Attendence girls", attendenceGirlsArray);
        console.log("Enrolment Girls",  enrolmentGirlsArray);
        console.log("Enrolment Boys", enrolmentBoysArray);
        console.log("Schools", SchoolArray);

        let school = SchoolArray[0];
        let boysPlotAttend = JSON.stringify(attendenceBoysArray[0]);
        let girlsPlotAttend = JSON.stringify(attendenceGirlsArray[0]);
        let boysPlotEnrol = JSON.stringify(enrolmentGirlsArray[0]);
        let girlsPlotEnrol = JSON.stringify(enrolmentBoysArray[0]);

        res.send({ School: school, boysAttend: boysPlotAttend, girlsAttend: girlsPlotAttend, boysEnrol:boysPlotEnrol, girlsEnrol:girlsPlotEnrol });

    })

});


module.exports = router;