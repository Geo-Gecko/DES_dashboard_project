var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:region/:year', function(req, res, next) {


    let nameOfRegion = req.params.region;
    let year = req.params.year;


    // run query where school id
    const limit = 1;
    const rQuery = `SELECT
    details.region AS region,
    ROUND(
        (
            SUM(
                inspection.established_staffing_as_per_enrollment
            ) / SUM(
                inspection.established_staffing_as_per_enrollment
            )
        ),
        2
    ) * 100 AS enrol,
    ROUND(
        (
            SUM(
                inspection.current_staffing_level
            ) / SUM(
                inspection.established_staffing_as_per_enrollment
            )
        ),
        2
    ) * 100 AS staff,
    ROUND(
        (
            SUM(
                inspection.staff_attendance_on_visit_day
            ) / SUM(
                inspection.established_staffing_as_per_enrollment
            )
        ),
        2
    ) * 100 AS attend,
    ROUND(
        (
            SUM(
                inspection.no_of_teachers_teaching_according_to_timetable
            ) / SUM(
                inspection.established_staffing_as_per_enrollment
            )
        ),
        2
    ) * 100 AS timetable
FROM
    ft_form_12 AS inspection,
    ft_form_11 AS details
WHERE
    details.submission_id = inspection.school_name AND details.region ='${nameOfRegion}' AND DATE_FORMAT(inspection.date_of_inspection,'%Y') = '${year}' group by details.region`;


    let enrolArray = [];
    let regionsArray = [];
    let staffArray = [];
    let attendArray = [];
    let timetableArray = [];

    connection.query(rQuery, function fillGraph(err, result, ) {
        if (err) throw err;

        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // Region
            let region = result[i].region;

            regionsArray.push(region)

            // Processing teacher enrolment for each school and each class
            let teacherenrol = [];
            for (let b = 1; b <= 1; b++) {
                let Tenrol = `enrol`;
                teacherenrol.push(result[i][Tenrol]);
            }
            enrolArray.push(teacherenrol);

            // Processing staffing level for each school and each class
            let teacherstaff = [];
            for (let g = 1; g <= 1; g++) {
                let Tstaff = `staff`;
                teacherstaff.push(result[i][Tstaff]);
            }
            staffArray.push(teacherstaff);

            
             // Processing number of teachers who attended on visitation day for each school and each class
             let teacherattend = [];
             for (let g = 1; g <= 1; g++) {
                 let Tattend = `attend`;
                 teacherattend.push(result[i][Tattend]);
             }
             attendArray.push(teacherattend);

             // Processing number of teachers teaching according to the timetable for each school and each class
             let teachertimetable = [];
             for (let g = 1; g <= 1; g++) {
                 let Ttime = `timetable`;
                 teachertimetable.push(result[i][Ttime]);
             }
             timetableArray.push(teacherstaff);

        }

        // console.log("staffArray",staffArray);
        // console.log("enrolArray",enrolArray);
        // console.log(" attendArray", attendArray);

        let region = regionsArray[0];
        let enrol = enrolArray[0];
        let staff = staffArray[0];
        let attend = attendArray[0];
        let  timetable =  timetableArray[0];

        res.send({ region: region, enrol: enrol, staff: staff, attend:attend, timetable:timetable  })

    })



});

module.exports = router;