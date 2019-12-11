var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/:region', function(req, res, next) {


    const limit = 10;

    let nameOfRegion = req.params.region;

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
            WHERE details.submission_id=inspection.school_name and details.region='${nameOfRegion}'
            group by details.region`;


    connection.query(dQuery, function fill(err, result, ) {
        if (err) throw err;
        let regionArray = [];
        let totalAttendenceBoysArray = [];
        let totalAttendenceGirlsArray = [];
        let totalEnrolGirlsArray = [];
        let totalEnrolBoysArray = [];
        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // district
            let region = result[i].region;

            regionArray.push(region)

// Processing boys for each school and each class
let boysArrayAttend = [];
for (let b = 1; b <= 1; b++) {
    let sClass = `boys_vd`;
    boysArrayAttend.push(result[i][sClass]);
}
totalAttendenceBoysArray.push(boysArrayAttend);

// Processing girls for each school and each class
let girlsArrayAttend = [];
for (let g = 1; g <= 1; g++) {
    let sClass = `girls_vd`;
    girlsArrayAttend.push(result[i][sClass]);
}
totalAttendenceGirlsArray.push(girlsArrayAttend);

 // Processing girls for each school and each class
 let girlsArrayEnrol = [];
 for (let g = 1; g <= 1; g++) {
     let sClass = `girls_enrol`;
     girlsArrayEnrol.push(result[i][sClass]);
 }
 totalEnrolGirlsArray.push(girlsArrayEnrol);

  // Processing girls for each school and each class
  let boysArrayEnrol = [];
  for (let g = 1; g <= 1; g++) {
      let sClass = `boys_enrol`;
      boysArrayEnrol.push(result[i][sClass]);
  }
  totalEnrolBoysArray.push(boysArrayEnrol);

}

console.log("Attendence", totalAttendenceGirlsArray);
// console.log("Attendence girls", attendenceGirlsArray);
// console.log("Enrolment Girls",  enrolmentGirlsArray);
// console.log("Enrolment Boys", enrolmentBoysArray);

let region = regionArray[0];
let boysPlotAttend =totalAttendenceBoysArray[0];
let girlsPlotAttend = totalAttendenceGirlsArray[0];
let boysPlotEnrol =  totalEnrolGirlsArray[0];
let girlsPlotEnrol =totalEnrolBoysArray[0];
// console.log(girlsPlotAttend)

res.send({ region: region, boysAttend: boysPlotAttend, girlsAttend: girlsPlotAttend, boysEnrol:boysPlotEnrol, girlsEnrol:girlsPlotEnrol});

})

});


module.exports = router;