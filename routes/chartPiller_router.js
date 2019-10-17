var express = require('express');
var router = express.Router();
var connection = require('../config/database');






router.get('/:name_of_school', function(req, res, next) {



    let nameOfSchool = req.params.name_of_school;

    const limit = 5;

    const aQuery =`select distinct(name_of_school) as schools, 1condition_of_school_building_and_compound as pilar1cond1, 2classroom_infrastructure as pilar1cond2,
    3sanitary_facilities as pilar1cond3, 4timetabling as pilar1cond4, 5teacher_deployment as pilar1cond5, 6disciplinary_policy as pilar1cond6,
    7inclusive_school_practice as pilar1cond7, 8gender_sensitive_school as pilar1cond8 from tbl_random where name_of_school = '${nameOfSchool}' limit ${limit}`;



    connection.query(aQuery, function fill(err, result,){
        if (err) throw err;
        let schoolsArray = [];
         let conditionalArray = [];
        // let attendenceGirlsArray = [];
        //let flag = 0; 
        for(let i = 0; i < result.length; i++){
            // School
            let school = result[i].schools;
    
            schoolsArray.push(school)
           
    
            //Processing each pillers for each school
            let piller1 = [];
            for(let b = 1; b <= 8; b++){
            let pillerCond = `pilar1cond${b}`;
            piller1.push(result[i][pillerCond]);
            }
            conditionalArray.push(piller1);
    
            // // Processing girls for each school and each class
            // let girlsArray = [];
            // for(let g = 1; g <= 7; g++){
            // let sClass = `p${g}_girls`;
            // girlsArray.push(result[i][sClass]);
            // }
            // attendenceGirlsArray.push(girlsArray);
    
        }
       
        
    
        let school = schoolsArray[0];
         //let conditionalPlot = JSON.stringify( conditionalArray[0]);
        // let girlsPlot = JSON.stringify(attendenceGirlsArray[0]);

        res.send({school:school, conditionalPlot: conditionalArray});
  
    })

});



module.exports = router;