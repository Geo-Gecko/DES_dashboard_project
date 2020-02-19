var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/:name_of_school/:year', function(req, res, next) {


    //const limit = 10;

    let nameOfSchool = req.params.name_of_school;
    let year = req.params.year;

    const aQuery = `SELECT inspection.school_name, details.name_of_school as name_of_school, 
    inspection.term as date_of_inspection,  
    round((sum(inspection.attendance_of_p1_boys_on_visitation_day) +
    sum(inspection.attendance_of_p2_boys_on_visitation_day)  +
    sum(inspection.attendance_of_p3_boys_on_visitation_day) +
    sum(inspection.attendance_of_p4_boys_on_visitation_day)  +
    sum(inspection.attendance_of_p5_boys_on_visitation_day) +
    sum(inspection.attendance_of_p6_boys_on_visitation_day)  +
    sum(inspection.attendance_of_p7_boys_on_visitation_day))/
    (sum(inspection.number_of_boys_enrolled_in_p1)+
    sum(inspection.number_of_boys_enrolled_in_p2)  +
    sum(inspection.number_of_boys_enrolled_in_p3) +
    sum(inspection.number_of_boys_enrolled_in_p4) +
    sum(inspection.number_of_boys_enrolled_in_p5) +
    sum(inspection.number_of_boys_enrolled_in_p6)  + 
    sum(inspection.number_of_boys_enrolled_in_p7)),2)*100  as boys_vd,
    round((sum(inspection.attendance_of_p1_girls_on_visitation_day) +
     sum(inspection.attendance_of_p2_girls_on_visitation_day) +
      sum(inspection.attendance_of_p3_girls_on_visitation_day) +
       sum(inspection.attendance_of_p4_girls_on_visitation_day) +
        sum(inspection.attendance_of_p5_girls_on_visitation_day) +
         sum(inspection.attendance_of_p6_girls_on_visitation_day) +
         sum(inspection.attendance_of_p7_girls_on_visitation_day))/
         (sum(inspection.number_of_girls_enrolled_in_p1) + 
         sum(inspection.number_of_girls_enrolled_in_p2)  +     
        sum(inspection.number_of_girls_enrolled_in_p3)  +   
        sum(inspection.number_of_girls_enrolled_in_p4)  +   
         sum(inspection.number_of_girls_enrolled_in_p5) +
         sum(inspection.number_of_girls_enrolled_in_p6)  +
         sum(inspection.number_of_girls_enrolled_in_p7)),2)*100 as girls_vd, 
        round((sum(inspection.number_of_boys_enrolled_in_p1)+
        sum(inspection.number_of_boys_enrolled_in_p2)  +
        sum(inspection.number_of_boys_enrolled_in_p3) +
        sum(inspection.number_of_boys_enrolled_in_p4) +
        sum(inspection.number_of_boys_enrolled_in_p5) +
        sum(inspection.number_of_boys_enrolled_in_p6)  + 
        sum(inspection.number_of_boys_enrolled_in_p7))/
        (sum(inspection.number_of_boys_enrolled_in_p1)+
        sum(inspection.number_of_boys_enrolled_in_p2)  +
        sum(inspection.number_of_boys_enrolled_in_p3) +
        sum(inspection.number_of_boys_enrolled_in_p4) +
        sum(inspection.number_of_boys_enrolled_in_p5) +
        sum(inspection.number_of_boys_enrolled_in_p6)  + 
        sum(inspection.number_of_boys_enrolled_in_p7)),2)*100  as boys_enrol,
        round((sum(inspection.number_of_girls_enrolled_in_p1) + 
        sum(inspection.number_of_girls_enrolled_in_p2)  +     
       sum(inspection.number_of_girls_enrolled_in_p3)  +   
       sum(inspection.number_of_girls_enrolled_in_p4)  +   
        sum(inspection.number_of_girls_enrolled_in_p5) +
        sum(inspection.number_of_girls_enrolled_in_p6)  +
        sum(inspection.number_of_girls_enrolled_in_p7))/
        (sum(inspection.number_of_girls_enrolled_in_p1) + 
        sum(inspection.number_of_girls_enrolled_in_p2)  +     
       sum(inspection.number_of_girls_enrolled_in_p3)  +   
       sum(inspection.number_of_girls_enrolled_in_p4)  +   
        sum(inspection.number_of_girls_enrolled_in_p5) +
        sum(inspection.number_of_girls_enrolled_in_p6)  +
        sum(inspection.number_of_girls_enrolled_in_p7)),2)*100  as girls_enrol
         FROM ft_form_12 as inspection, ft_form_11 as details 
         WHERE details.submission_id=inspection.school_name and details.name_of_school ='${nameOfSchool}' AND DATE_FORMAT(inspection.date_of_inspection,'%Y') = '${year}' and inspection.term != 'NULL' group by inspection.term order by inspection.term`;


    connection.query(aQuery, function fill(err, result, ) {
        if (err) throw err;
        let SchoolArray= [];
        let inspectionDataArray = [];
        let enrolmentBoysArray = [];
        let enrolmentGirlsArray = [];
        let attendenceBoysArray = [];
        let attendenceGirlsArray = [];
        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // School
            let school = result[i]. name_of_school;
            SchoolArray.push(school)
       // console.log(school);
    // Processing inspection date 
            let inpsection = [];
            for (let m = 1; m <= 1; m++) {
                let inpsect = `date_of_inspection`;
                inpsection.push(result[i][inpsect]);
            }
            inspectionDataArray.push(inpsection);


            // Processing boys for each school and each class
            let boysArrayAttend = [];
            for (let b = 1; b <= 1; b++) {
                let boysData = `boys_vd`;
                boysArrayAttend.push(result[i][boysData]);
            }
            attendenceBoysArray.push(boysArrayAttend);

            // Processing girls for each school and each class
            let girlsArrayAttend = [];
            for (let g = 1; g <= 1; g++) {
                let girlsData = `girls_vd`;
                girlsArrayAttend.push(result[i][girlsData]);
            }
            attendenceGirlsArray.push(girlsArrayAttend);

             // Processing girls for each school and each class
             let girlsArrayEnrol = [];
             for (let g = 1; g <= 1; g++) {
                 let girlsEnroData = `girls_enrol`;
                 girlsArrayEnrol.push(result[i][girlsEnroData]);
             }
             enrolmentGirlsArray.push(girlsArrayEnrol);

              // Processing girls for each school and each class
              let boysArrayEnrol = [];
              for (let g = 1; g <= 1; g++) {
                  let boysEnroData = `boys_enrol`;
                  boysArrayEnrol.push(result[i][boysEnroData]);
              }
              enrolmentBoysArray.push(boysArrayEnrol);

        }

        let school = SchoolArray[0];
        let boysPlotAttend = attendenceBoysArray;
        let girlsPlotAttend = attendenceGirlsArray;
        let boysPlotEnrol = enrolmentGirlsArray;
        let girlsPlotEnrol = enrolmentBoysArray;
        let inspectionPlot = inspectionDataArray;

        res.send({ School: school, boysAttend: boysPlotAttend, girlsAttend: girlsPlotAttend, boysEnrol:boysPlotEnrol, girlsEnrol:girlsPlotEnrol, inspectPlot:inspectionPlot});

    })

});


module.exports = router;