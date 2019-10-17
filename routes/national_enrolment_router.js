var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/:region', function(req, res, next) {

    
    const limit = 10;

    let nameOfRegion = req.params.region;

    const dQuery =`select distinct(region) as region, sum(p1__enrolment__boys) as p1_boys, sum(p1__enrolment__girls) as p1_girls, 
    sum(p2__enrolment__boys) as p2_boys, sum(p2__enrolment__girls) as p2_girls, sum(p3__enrolment__boys) as p3_boys,
     sum(p3__enrolment__girls) as p3_girls, sum(p4__enrolment__boys) as p4_boys,
    sum(p4__enrolment__girls) as p4_girls, sum(p5__enrolment__boys) as p5_boys, 
    sum(p5__enrolment__girls) as p5_girls, sum(p6__enrolment__boys) as p6_boys, 
    sum(p6__enrolment__girls) as p6_girls, sum(p7__enrolment__boys) as p7_boys,
     sum(p7__enrolment__girls) as p7_girls from tbl_random   where region = '${nameOfRegion}' group by region limit ${limit}`;


    connection.query(dQuery, function fill(err, result,){
            if (err) throw err;
            let regionArray = [];
            let totalEnrolmentBoysArray = [];
            let totalEnrolmentGirlsArray = [];
            //let flag = 0;
            for(let i = 0; i < result.length; i++){
                // national
                let region = result[i].region;
        
                regionArray.push(region)

        
                // Processing total number of boys in a region
                let boysArray = [];
                for(let b = 1; b <= 7; b++){
                let sregion = `p${b}_boys`;
                boysArray.push(result[i][sregion]);
                }
                totalEnrolmentBoysArray.push(boysArray);
        
                // Processing total number óf girls in a given region 
                let girlsArray = [];
                for(let g = 1; g <= 7; g++){
                let sregion = `p${g}_girls`;
                girlsArray.push(result[i][sregion]);
                }
                totalEnrolmentGirlsArray.push(girlsArray);
        
            }
            // console.log("REGION",  regionArray);
            // console.log("TOTAL ENROLMENT BOYS",  totalEnrolmentBoysArray );
            // console.log("TOTAL ENROLMENT GILRS",  totalEnrolmentGirlsArray);
            
        
            let region =  regionArray[0];
            let boysPlot = JSON.stringify(totalEnrolmentBoysArray[0]);
            let girlsPlot = JSON.stringify( totalEnrolmentGirlsArray[0]);

            res.send({region: region, boys: boysPlot, girls: girlsPlot});
      
        })

});


module.exports = router;