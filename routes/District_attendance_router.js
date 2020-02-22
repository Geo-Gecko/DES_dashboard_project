var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/:district/:year', function(req, res, next) {


    const limit = 10;

    let nameOfDistrict = req.params.district;
    let year = req.params.year;

    const dQuery = `SELECT details.region as region, 
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
            WHERE details.submission_id=inspection.school_name and details.district = '${nameOfDistrict}' AND DATE_FORMAT(inspection.date_of_inspection,'%Y') = '${year}'
            group by details.district`;

            connection.query(dQuery, function fill(err, result, ) {
                if (err) throw err;
                let DistrictArray= [];
                let enrolmentBoysArray = [];
                let enrolmentGirlsArray = [];
                let attendenceBoysArray = [];
                let attendenceGirlsArray = [];
                //let flag = 0;
                for (let i = 0; i < result.length; i++) {
                    // School
                    let district = result[i]. district;
                    DistrictArray.push(district)
        
        
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
        
                // console.log("Attendence", attendenceBoysArray);
                // console.log("Attendence girls", attendenceGirlsArray);
                // console.log("Enrolment Girls",  enrolmentGirlsArray);
                // console.log("Enrolment Boys", enrolmentBoysArray);
               
                let district = DistrictArray[0];
                let boysPlotAttend =attendenceBoysArray[0];
                let girlsPlotAttend = attendenceGirlsArray[0];
                let boysPlotEnrol = enrolmentGirlsArray[0];
                let girlsPlotEnrol =enrolmentBoysArray[0];
        
                res.send({ district: district, boysAttend: boysPlotAttend, girlsAttend: girlsPlotAttend, boysEnrol:boysPlotEnrol, girlsEnrol:girlsPlotEnrol });
        
            })
        
        });
        
        
        module.exports = router;