var express = require('express');
var router = express.Router();
var connection = require('../config/database');






router.get('/:region', function(req, res, next) {


    const limit = 10;

    let nameOfRegion = req.params.region;

    const aQuery = `select distinct(details.region) as region, 
    cast(avg(inspection.condition_of_school_building_and_compound) as unsigned)  as pilar1cond1, 
    cast(avg(inspection.classroom_infrastructure) as unsigned) as pilar1cond2,
    cast(avg(inspection.sanitary_facilities) as unsigned) as pilar1cond3, 
    cast(avg(inspection.timetabling) as unsigned) as pilar1cond4, 
    cast(avg(inspection.teacher_deployment) as unsigned) as pilar1cond5,
    cast(avg(inspection.disciplinary_policy) as unsigned)  as pilar1cond6, cast(avg(inspection.inclusive_school_practice) as unsigned) as pilar1cond7, cast(avg(inspection.gender_sensitive_school) as unsigned) as pilar1cond8 
    FROM  ft_form_12  as inspection,  ft_form_11  as details 
    WHERE details.submission_id=inspection.school_name group by details.region`;



    connection.query(aQuery, function fill(err, result, ) {
        if (err) throw err;
        let regionArray = [];
        let regionConditionalArray = [];
        // let attendenceGirlsArray = [];
        //let flag = 0; 
        for (let i = 0; i < result.length; i++) {
            // School
            let region = result[i].region;

            regionArray.push(region);


            //Processing each pillers for each school
            let piller1 = [];
            for (let b = 1; b <= 8; b++) {
                let pillerCond = `pilar1cond${b}`;
                piller1.push(result[i][pillerCond]);
            }
            regionConditionalArray.push(piller1);

            // // Processing girls for each school and each class
            // let girlsArray = [];
            // for(let g = 1; g <= 7; g++){
            // let sClass = `p${g}_girls`;
            // girlsArray.push(result[i][sClass]);
            // }
            // attendenceGirlsArray.push(girlsArray);

        }


        // console.log("REGION",regionArray);
        // console.log("CONDITIONAL",  regionConditionalArray);




        let region = regionArray[0];
        let regionConditionalPlot = regionConditionalArray[0];
        // let girlsPlot = JSON.stringify(attendenceGirlsArray[0]);

        res.send({ region: region, regionConditionalPlot: regionConditionalArray });

    })

});



module.exports = router;