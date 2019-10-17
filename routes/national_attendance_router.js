var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/:region', function(req, res, next) {

    
    const limit = 10;

    let nameOfREgion = req.params.region;

    const dQuery =`select distinct(region), sum(p1__attendance_on_visit_day__boys) as p1_boys,
    sum(p1__attendance_on_visit_day__girls) as p1_girls, sum(p2__attendance_on_visit_day__boys) as p2_boys, 
    sum(p2__attendance_on_visit_day__girls) as p2_girls, sum(p3__attendance_on_visit_day__boys) as p3_boys,
    sum(p3__attendance_on_visit_day__girls) as p3_girls, sum(p4__attendance_on_visit_day__boys) as p4_boys,
   sum(p4__attendance_on_visit_day__girls) as p4_girls, sum(p5__attendance_on_visit_day__boys) as p5_boys,
    sum(p5__attendance_on_visit_day__girls) as p5_girls, sum(p6__attendance_on_visit_day__boys) as p6_boys, 
    sum(p6__attendance_on_visit_day__girls) as p6_girls, sum(p7__attendance_on_visit_day__boys) as p7_boys,
    sum(p7__attendance_on_visit_day__girls) as p7_girls from tbl_random   where region = '${nameOfREgion}' 
    group by region limit ${limit}`;


    connection.query(dQuery, function fill(err, result,){
            if (err) throw err;
            let regionArray = [];
            let totalAttendenceBoysArray = [];
            let totalAttendenceGirlsArray = [];
            //let flag = 0;
            for(let i = 0; i < result.length; i++){
                // district
                let region = result[i].region;
        
                regionArray.push(region)

        
                // Processing boys for each school and each class
                let boysArray = [];
                for(let b = 1; b <= 7; b++){
                let sRegion = `p${b}_boys`;
                boysArray.push(result[i][sRegion]);
                }
                totalAttendenceBoysArray.push(boysArray);
        
                // Processing girls for each school and each class
                let girlsArray = [];
                for(let g = 1; g <= 7; g++){
                let sDistricts = `p${g}_girls`;
                girlsArray.push(result[i][sDistricts]);
                }
                totalAttendenceGirlsArray.push(girlsArray);
        
            }
            // console.log("REGION", regionArray);
            // console.log("TOTAL ATTENDENCE BOYS", totalAttendenceBoysArray );
            // console.log("TOTAL ATTENDENCE GILRS", totalAttendenceGirlsArray);
            
        
            let region = regionArray[0];
            let boysPlot = JSON.stringify(totalAttendenceBoysArray[0]);
            let girlsPlot = JSON.stringify( totalAttendenceGirlsArray[0]);

            res.send({region: region, boys: boysPlot, girls: girlsPlot});
      
        })

});


module.exports = router;















