var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:region', function(req, res, next) {

    // Get school id
    const limit = 1;

    let nameOfRegion = req.params.region;


    // run query where school id

    const dQuery = `select distinct(details.region) as region,
   avg(inspection.classroom_to_pupil_ratio_in_lower_primaryp1p3) as cprp1p3,
     avg(inspection.classroom_to_pupil_ratio_in_upper_primaryp4p7) as cprp4p7  
     FROM  ft_form_12  as inspection,  ft_form_11  as details 
     WHERE details.submission_id=inspection.school_name and details.region='${nameOfRegion}' group by details.region`;




    let regionArray = [];
    let cpP1top3Array = [];
    let cpP4top7Array = [];

    connection.query(dQuery, function fill(err, result, ) {
        if (err) throw err;

        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // district
            let region = result[i].region;

            regionArray.push(region)

            // Processing boys for each region
            let cpRatio = [];
            for (let b = 1; b <= 1; b++) {
                let cRatio = `cprp1p3`;
                cpRatio.push(result[i][cRatio]);
            }
            cpP1top3Array.push(cpRatio);

            // Processing girls for each region
            let cpRatiop7 = [];
            for (let g = 1; g <= 1; g++) {
                let cRatio = `cprp4p7`;
                cpRatiop7.push(result[i][cRatio]);
            }
            cpP4top7Array.push(cpRatiop7);

        }

        // console.log("REGION", regionArray);
        // console.log("CP1TOP3", cpP1top3Array );
        console.log("CP4TOP7",cpP4top7Array);

        let region = regionArray[0];
        let cp1top3Plot = cpP1top3Array[0];
        let cp4top7Plot = cpP4top7Array[0];

        res.send({ region: region, cp1top3: cp1top3Plot, cp4top7: cp4top7Plot })

    })



});

module.exports = router;