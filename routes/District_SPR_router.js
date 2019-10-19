var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:district', function(req, res, next) {

    // Get school id
    const limit = 1;

    let nameOfDistrict = req.params.district;


    // run query where school id

    const dQuery = `select distinct(details.district) as district,
    sum(inspection.stance_to_pupilboys_ratio) as sprboys,  
    sum(inspection.stance_to_pupilgirls_ratio) as sprgirls,
     sum(inspection.stance_to_pupiloverall_ratio) as spr_overall 
     FROM  ft_form_12  as inspection,  ft_form_11  as details 
     WHERE details.submission_id=inspection.school_name group by details.district`;


    let districtArray = [];
    let sprboysArray = [];
    let sprgirlsArray = [];
    let sproverallArray = [];

    connection.query(dQuery, function fill(err, result, ) {
        if (err) throw err;

        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // district 
            let district = result[i].district;

            districtArray.push(district)

            // Processing boys for stance ratio for district 
            let srRatio = [];
            for (let b = 1; b <= 1; b++) {
                let sRatio = `sprboys`;
                srRatio.push(result[i][sRatio]);
            }
            sprboysArray.push(srRatio);

            // Processing girls for stance ratio for district 
            let srRatiop7 = [];
            for (let g = 1; g <= 1; g++) {
                let sRatio = `sprgirls`;
                srRatiop7.push(result[i][sRatio]);
            }
            sprgirlsArray.push(srRatiop7);

            // Processing stance for overall for district 
            let srRatiop8 = [];
            for (let a = 1; a <= 1; a++) {
                let sRatio = `spr_overall`;
                srRatiop8.push(result[i][sRatio]);
            }
            sproverallArray.push(srRatiop7);
        }

        // console.log("DISTRICT",districtArray);
        // console.log("SPRBOYS", sprboysArray );
        // console.log("SPRGIRLS",sprgirlsArray);
        // console.log("SPROVERALL", sproverallArray);

        let district = districtArray[0];
        let sprboysPlot = JSON.stringify(sprboysArray[0]);
        let sprgirlsPlot = JSON.stringify(sprgirlsArray[0]);
        let sproverallPlot = JSON.stringify(sproverallArray[0]);

        res.send({ district: district, sprboys: sprboysPlot, sprgirls: sprgirlsPlot, sproverall: sproverallPlot })

    })



});

module.exports = router;