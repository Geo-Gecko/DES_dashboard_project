var express = require('express');
var router = express.Router();
var connection = require('../config/database');



/* GET home page. */
router.get('/:name_of_school', function(req, res, next) {


    // Get school id
    let nameOfSchool = req.params.name_of_school;


    // run query where school id
    const limit = 1;
    const cQuery = `select distinct(inspection.school_name) as school,
    round(inspection.stance_to_pupilboys_ratio) as sprboys,  
    round(inspection.stance_to_pupilgirls_ratio) as sprgirls,
    round(inspection.stance_to_pupiloverall_ratio) as spr_overall 
     FROM  ft_form_12  as inspection,  ft_form_11  as details 
     WHERE details.submission_id=inspection.school_name and name_of_school = '${nameOfSchool}' `;
       

    let schoolArray = [];
    let sprboysArray = [];
    let sprgirlsArray = [];
    let sproverallArray = [];

    connection.query(cQuery, function fill(err, result, ) {
        if (err) throw err;

        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // School
            let school = result[i].schools;

            schoolArray.push(school)

            // Processing boys for stance ratio
            let srRatio = [];
            for (let b = 1; b <= 1; b++) {
                let sRatio = `sprboys`;
                srRatio.push(result[i][sRatio]);
            }
            sprboysArray.push(srRatio);

            // Processing girls for stance ratio
            let srRatiop7 = [];
            for (let g = 1; g <= 1; g++) {
                let sRatio = `sprgirls`;
                srRatiop7.push(result[i][sRatio]);
            }
            sprgirlsArray.push(srRatiop7);

            // Processing stance for overall 
            let srRatiop8 = [];
            for (let a = 1; a <= 1; a++) {
                let sRatio = `spr_overall`;
                srRatiop8.push(result[i][sRatio]);
            }
            sproverallArray.push(srRatiop7);
        }

        let school = schoolArray[0];
        let sprboysPlot = JSON.stringify(sprboysArray[0]);
        let sprgirlsPlot = JSON.stringify(sprgirlsArray[0]);
        let sproverallPlot = JSON.stringify(sproverallArray[0]);

        res.send({ school: school, sprboys: sprboysPlot, sprgirls: sprgirlsPlot, sproverall: sproverallPlot })

    })



});

module.exports = router;