var express = require('express');
var router = express.Router();
var connection = require('../config/database');






router.get('/:district', function(req, res, next) {


    const limit = 10;

    let nameOfDistrict = req.params.district;

    const aQuery = `select distinct(details.district) as district,
    inspection.term as inspection_date,
    round((sum(inspection.attendance_of_p1_boys_on_visitation_day)+
    sum(inspection.attendance_of_p1_girls_on_visitation_day)+
    sum(inspection.attendance_of_p2_boys_on_visitation_day) +
    sum(inspection.attendance_of_p2_girls_on_visitation_day)+
    sum(inspection.attendance_of_p3_boys_on_visitation_day) +
    sum(inspection.attendance_of_p3_girls_on_visitation_day) +
    sum(inspection.attendance_of_p4_boys_on_visitation_day) +
    sum(inspection.attendance_of_p4_girls_on_visitation_day)+
    sum(inspection.attendance_of_p5_boys_on_visitation_day) +
    sum(inspection.attendance_of_p5_girls_on_visitation_day) +
    sum(inspection.attendance_of_p6_boys_on_visitation_day) +
    sum(inspection.attendance_of_p6_girls_on_visitation_day) + 
    sum(inspection.attendance_of_p7_boys_on_visitation_day) +
    sum(inspection.attendance_of_p7_girls_on_visitation_day))/
    (sum(inspection.number_of_boys_enrolled_in_p1)+
    sum(inspection.number_of_girls_enrolled_in_p1)+
    sum(inspection.number_of_boys_enrolled_in_p2)+
    sum(inspection.number_of_girls_enrolled_in_p2)+
    sum(inspection.number_of_boys_enrolled_in_p3)+
    sum(inspection.number_of_girls_enrolled_in_p3)+
    sum(inspection.number_of_boys_enrolled_in_p4)+
    sum(inspection.number_of_girls_enrolled_in_p4)+
    sum(inspection.number_of_boys_enrolled_in_p5)+
    sum(inspection.number_of_girls_enrolled_in_p5)+
    sum(inspection.number_of_boys_enrolled_in_p6)+
    sum(inspection.number_of_girls_enrolled_in_p6)+
    sum(inspection.number_of_boys_enrolled_in_p7) +
    sum(inspection.number_of_girls_enrolled_in_p7)),2)*100 as attendance,
    round((sum(inspection.number_of_boys_enrolled_in_p1)+
    sum(inspection.number_of_girls_enrolled_in_p1)+
    sum(inspection.number_of_boys_enrolled_in_p2)+
    sum(inspection.number_of_girls_enrolled_in_p2)+
    sum(inspection.number_of_boys_enrolled_in_p3)+
    sum(inspection.number_of_girls_enrolled_in_p3)+
    sum(inspection.number_of_boys_enrolled_in_p4)+
    sum(inspection.number_of_girls_enrolled_in_p4)+
    sum(inspection.number_of_boys_enrolled_in_p5)+
    sum(inspection.number_of_girls_enrolled_in_p5)+
    sum(inspection.number_of_boys_enrolled_in_p6)+
    sum(inspection.number_of_girls_enrolled_in_p6)+
    sum(inspection.number_of_boys_enrolled_in_p7) +
    sum(inspection.number_of_girls_enrolled_in_p7))/
    (sum(inspection.number_of_boys_enrolled_in_p1)+
    sum(inspection.number_of_girls_enrolled_in_p1)+
    sum(inspection.number_of_boys_enrolled_in_p2)+
    sum(inspection.number_of_girls_enrolled_in_p2)+
    sum(inspection.number_of_boys_enrolled_in_p3)+
    sum(inspection.number_of_girls_enrolled_in_p3)+
    sum(inspection.number_of_boys_enrolled_in_p4)+
    sum(inspection.number_of_girls_enrolled_in_p4)+
    sum(inspection.number_of_boys_enrolled_in_p5)+
    sum(inspection.number_of_girls_enrolled_in_p5)+
    sum(inspection.number_of_boys_enrolled_in_p6)+
    sum(inspection.number_of_girls_enrolled_in_p6)+
    sum(inspection.number_of_boys_enrolled_in_p7) +
    sum(inspection.number_of_girls_enrolled_in_p7)),2)*100 as enrollment
FROM  ft_form_12  as inspection,  ft_form_11  as details 
WHERE details.submission_id=inspection.school_name and details.district='${nameOfDistrict}' and
inspection.term != 'NULL' group by details.district, inspection.term`;

    
 let enrolArray = [];
 let districtsArray = [];
 let attendArray = [];
 let inspectionArray = [];

 connection.query(aQuery, function fillGraph(err, result, ) {
     if (err) throw err;

     //let flag = 0;
     for (let i = 0; i < result.length; i++) {
         // School
         let district = result[i].district;

         districtsArray.push(district)

         // Processing student enrolment for each district
         let studentenrol = [];
         for (let b = 1; b <= 1; b++) {
             let Tenrol = `enrollment`;
             studentenrol.push(result[i][Tenrol]);
         }
         enrolArray.push(studentenrol);

         
          // Processing student attendance for each district 
          let studentattend = [];
          for (let g = 1; g <= 1; g++) {
              let Tattend = `attendance`;
              studentattend.push(result[i][Tattend]);
          }
          attendArray.push(studentattend);

            // processing inspection dates for each district
            let inspections = [];
            for (let g = 1; g <= 1; g++) {
                let Tinspection = `inspection_date`;
                inspections.push(result[i][Tinspection]);
            }
            inspectionArray.push(inspections);

     }

     
     console.log("enrolArray",enrolArray);
     console.log(" attendArray", attendArray);
     console.log(" inspectionArray", inspectionArray);
    

     let district = districtsArray[0];
     let enrol = enrolArray;
     let attend = attendArray;
     let inspection =  inspectionArray;


     res.send({ district: district, enrol: enrol, attend:attend, inspection:inspection})

 })



});

module.exports = router;