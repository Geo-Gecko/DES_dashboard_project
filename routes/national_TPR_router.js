var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:region/:year', function(req, res, next) {

    // Get school id
    const limit = 1;

    let nameOfRegion = req.params.region;
    let year = req.params.year;


    // run query where school id

    const dQuery = `select distinct(details.region) as region,
    round(avg(inspection.teacher_to_pupil_ratio_in_lower_primaryp1p3)) as tprp1p3,
    round(avg(inspection.teacher_to_pupil_ratio_in_upper_primaryp4p7)) as tprp4p7 
     FROM  ft_form_12  as inspection,  ft_form_11  as details
      WHERE details.submission_id=inspection.school_name and details.region='${nameOfRegion}' AND DATE_FORMAT(inspection.date_of_inspection,'%Y') = '${year}' group by details.region`;


    let regionArray = [];
    let p1top3Array = [];
    let p4top7Array = [];

    connection.query(dQuery, function fillGraph(err, result, ) {
        if (err) throw err;

        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // region
            let region = result[i].region;

            regionArray.push(region)

            // Processing boys for each district and each school
            let tpRatio = [];
            for (let b = 1; b <= 1; b++) {
                let sRatio = `tprp1p3`;
                tpRatio.push(result[i][sRatio]);
            }
            p1top3Array.push(tpRatio);

            // Processing girls for each district and each school
            let tpRatiop7 = [];
            for (let g = 1; g <= 1; g++) {
                let sRatio = `tprp4p7`;
                tpRatiop7.push(result[i][sRatio]);
            }
            p4top7Array.push(tpRatiop7);

        }
        
        let region = regionArray[0];
        let p1top3Plot =p1top3Array[0];
        let p4top7Plot = p4top7Array[0];

        res.send({ region: region, p1top3: p1top3Plot, p4top7: p4top7Plot })

    })



});

module.exports = router;