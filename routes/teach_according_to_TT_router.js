var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:name_of_school/:year', function(req, res, next) {

    // Get school id
    let nameOfSchool = req.params.name_of_school;
    let year = req.params.year;


    // run query where school id
    const limit = 1;
    const rQuery = `select inspection.term as inspection_date,
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
     details.name_of_school as school FROM  ft_form_12  as inspection,  ft_form_11  as details WHERE details.submission_id=inspection.school_name and details.name_of_school ='${nameOfSchool}'
     AND DATE_FORMAT(inspection.date_of_inspection,'%Y') = '${year}' and inspection.term != 'NULL' group by inspection.term order by inspection.term asc`;


    let schoolsArray = [];
    let timetableArray = [];
    let inspectionArray =[];

    connection.query(rQuery, function fillGraph(err, result, ) {
        if (err) throw err;

        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // School
            let school = result[i].school;

            schoolsArray.push(school)


             // Processing number of teachers teaching according to the timetable for each school and each class
             let teachertimetable = [];
             for (let g = 1; g <= 1; g++) {
                 let Ttime = `timetable`;
                 teachertimetable.push(result[i][Ttime]);
             }
             timetableArray.push(teachertimetable);

                // processing inspection dates
                let inspections = [];
                for (let m = 1; m <= 1; m++) {
                    let sch_inspection = `inspection_date`;
                    inspections.push(result[i][sch_inspection]);
                }
                inspectionArray.push(inspections);

        }
        let sch_school = schoolsArray;
        let sch_timetable =  timetableArray;
        let sch_inspection = inspectionArray;
        console.log(sch_timetable)

        

        res.send({ school: sch_school, timetable:sch_timetable, inspection:sch_inspection})
    })



});

module.exports = router;