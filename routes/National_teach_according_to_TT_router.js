var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:region', function(req, res, next) {


    let nameOfRegion = req.params.region;


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
    details.region as region FROM  ft_form_12  as inspection,  ft_form_11  as details
     WHERE details.submission_id=inspection.school_name and details.region ='${nameOfRegion}' and
    inspection.term != 'NULL'  group by inspection.term order by inspection.term asc`;


    let regionArray = [];
    let timetableArray = [];
    let inspectionArray=[];

    connection.query(rQuery, function fillGraph(err, result, ) {
        if (err) throw err;

        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // School
            let region = result[i].region;

            regionArray.push(region)


             // Processing number of teachers teaching according to the timetable for each school and each class
             let teachertimetable = [];
             for (let g = 1; g <= 1; g++) {
                 let Ttime = `timetable`;
                 teachertimetable.push(result[i][Ttime]);
             }
             timetableArray.push(teachertimetable);

             // processing inspection dates
             let inspections = [];
             for (let g = 1; g <= 1; g++) {
                 let Tinspection = `inspection_date`;
                 inspections.push(result[i][Tinspection]);
             }
             inspectionArray.push(inspections);


        }


        let region = regionArray[0];
        let  timetable =  timetableArray;
        let inspections = inspectionArray;

        res.send({ region: region, timetable:timetable, inspections:inspections  })

    })



});

module.exports = router;