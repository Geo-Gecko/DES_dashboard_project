var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/stats/:name_of_school/:year', function(req, res, next) {

    // Get school id
    let nameOfSchool = req.params.name_of_school;
    let year = req.params.year;


    // run query where school id
    const limit = 1;
    const rQuery = `select distinct(inspection.school_name),  details.name_of_school as school,
    round(inspection.teacher_to_pupil_ratio_in_lower_primaryp1p3) as tprp1p3,
    round(inspection.teacher_to_pupil_ratio_in_upper_primaryp4p7) as tprp4p7 
     FROM  ft_form_12  as inspection,  ft_form_11  as details
      WHERE details.submission_id=inspection.school_name and details.name_of_school ='${nameOfSchool}'
      AND DATE_FORMAT(inspection.date_of_inspection,'%Y') = '${year}'`;


    let schoolsArray = [];
    let p1top3Array = [];
    let p4top7Array = [];

    connection.query(rQuery, function fillGraph(err, result, ) {
        if (err) throw err;

        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // School
            let school = result[i].school;

            schoolsArray.push(school)

            // Processing boys for each school and each class
            let tpRatio = [];
            for (let b = 1; b <= 1; b++) {
                let sRatio = `tprp1p3`;
                tpRatio.push(result[i][sRatio]);
            }
            p1top3Array.push(tpRatio);

            // Processing girls for each school and each class
            let tpRatiop7 = [];
            for (let g = 1; g <= 1; g++) {
                let sRatio = `tprp4p7`;
                tpRatiop7.push(result[i][sRatio]);
            }
            p4top7Array.push(tpRatiop7);

        }

        // console.log("SCHOOLS",schoolsArray);
        // console.log("P1TOP3",p1top3Array );
        // console.log("P4P7",p4top7Array);

        let school = schoolsArray[0];
        let p1top3Plot = p1top3Array[0];
        let p4top7Plot = p4top7Array[0];

        res.send({ school: school, p1top3: p1top3Plot, p4top7: p4top7Plot })

    })



});

module.exports = router;