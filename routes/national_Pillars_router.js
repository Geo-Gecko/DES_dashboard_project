var express = require('express');
var router = express.Router();
var connection = require('../config/database');






router.get('/:region', function(req, res, next) {


    const limit = 10;

    let nameOfRegion = req.params.region;

    const aQuery =`select distinct(region) as region, cast(avg(1condition_of_school_building_and_compound) as unsigned)  as pilar1cond1,
    cast(avg(2classroom_infrastructure) as unsigned) as pilar1cond2,
    cast(avg(3sanitary_facilities) as unsigned) as pilar1cond3, cast(avg(4timetabling) as unsigned) as pilar1cond4, 
    cast(avg(5teacher_deployment) as unsigned) as pilar1cond5, 
    cast(avg(6disciplinary_policy) as unsigned) as pilar1cond6,
    cast(avg(7inclusive_school_practice) as unsigned)  as pilar1cond7, 
    cast(avg(8gender_sensitive_school) as unsigned) as pilar1cond8 from tbl_random where region = '${nameOfRegion}'group by region limit  ${limit}`;



    connection.query(aQuery, function fill(err, result,){
        if (err) throw err;
        let   regionArray = [];
         let regionConditionalArray = [];
        // let attendenceGirlsArray = [];
        //let flag = 0; 
        for(let i = 0; i < result.length; i++){
            // School
            let region = result[i].region;
    
            regionArray.push(region);
           
    
            //Processing each pillers for each school
            let piller1 = [];
            for(let b = 1; b <= 8; b++){
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
    
       
        
    
        let region =  regionArray[0];
        let regionConditionalPlot = regionConditionalArray[0];
        // let girlsPlot = JSON.stringify(attendenceGirlsArray[0]);

        res.send({region: region, regionConditionalPlot: regionConditionalArray});
  
    })

});



module.exports = router;