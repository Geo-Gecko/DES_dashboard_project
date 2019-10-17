var express = require('express');
var router = express.Router();
var connection = require('../config/database');






router.get('/:district', function(req, res, next) {


    const limit = 10;

    let nameOfDistrict = req.params.district;

    const aQuery =`select distinct(district) as district, cast(avg(1condition_of_school_building_and_compound) as unsigned)  as pilar1cond1, cast(avg(2classroom_infrastructure) as unsigned) as pilar1cond2,
    cast(avg(3sanitary_facilities) as unsigned) as pilar1cond3, cast(avg(4timetabling) as unsigned) as pilar1cond4, cast(avg(5teacher_deployment) as unsigned) as pilar1cond5, 
    cast(avg(6disciplinary_policy) as unsigned) as pilar1cond6,
    cast(avg(7inclusive_school_practice) as unsigned)  as pilar1cond7, cast(avg(8gender_sensitive_school) as unsigned) as pilar1cond8 from tbl_random where district = '${nameOfDistrict}'group by district limit  ${limit}`;



    connection.query(aQuery, function fill(err, result,){
        if (err) throw err;
        let   districtArray = [];
         let districtConditionalArray = [];
        // let attendenceGirlsArray = [];
        //let flag = 0; 
        for(let i = 0; i < result.length; i++){
            // School
            let district = result[i].district;
    
            districtArray.push(district)
           
    
            //Processing each pillers for each school
            let piller1 = [];
            for(let b = 1; b <= 8; b++){
            let pillerCond = `pilar1cond${b}`;
            piller1.push(result[i][pillerCond]);
            }
            districtConditionalArray.push(piller1);    
        }

        let district =  districtArray[0];
        //console.log(districtConditionalArray)

        let districtConditionalPlot = districtConditionalArray;
        // let girlsPlot = JSON.stringify(attendenceGirlsArray[0]);

        res.send({school: district, districtConditionalPlot:districtConditionalArray});
  
    })

});



module.exports = router;