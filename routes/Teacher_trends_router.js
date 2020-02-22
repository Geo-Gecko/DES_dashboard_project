var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:name_of_school/:year', function(req, res, next) {

    // Get school id
    let nameOfSchool = req.params.name_of_school;
    let year = req.params.year;


    // run query where school id
    const limit = 1;
    const rQuery = `SELECT
    inspection.term AS inspection_date,
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
    ) * 100 AS timetable,
    details.district
FROM
    ft_form_12 AS inspection,
    ft_form_11 AS details
WHERE
    details.submission_id = inspection.school_name AND details.name_of_school = '${nameOfSchool}' AND DATE_FORMAT(inspection.date_of_inspection,'%Y') = ${year} AND inspection.term != 'NULL'
GROUP BY
    inspection.term
ORDER BY
    inspection.term ASC`;


    let enrolArray = [];
    let schoolsArray = [];
    let staffArray = [];
    let attendArray = [];
    let inspectionArray =[];

    connection.query(rQuery, function fillGraph(err, result, ) {
        if (err) throw err;

        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // School
            let school = result[i].school;

            schoolsArray.push(school)

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

                // processing inspection dates
                let inspections = [];
                for (let m = 1; m <= 1; m++) {
                    let sch_inspection = `inspection_date`;
                    inspections.push(result[i][sch_inspection]);
                }
                inspectionArray.push(inspections);

        }

        let school_name = schoolsArray[0];
        let sch_enrol = enrolArray;
        let sch_staff = staffArray;
        let sch_attend = attendArray;
        let sch_inspection = inspectionArray;
        console.log("sch_enrol",sch_enrol);
        

        res.send({ school: school_name, enrol: sch_enrol, staff: sch_staff, attend:sch_attend,  inspection:sch_inspection})
    })



});

module.exports = router;