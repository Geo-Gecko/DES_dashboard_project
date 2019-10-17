var express = require('express');
var router = express.Router();
var connection = require('../config/database');



/* GET home page. */
router.get('/:name_of_school', function(req, res, next) {

    
    // Get school id
    let nameOfSchool = req.params.name_of_school;


    // run query where school id
    const limit = 1;
    const cQuery = `select distinct(name_of_school) as schools, classroompupil_ratio_cpr_at_lower_primary_p1__p3 as cpRatio_p1p3,
    classroompupil_ratio_cpr_at_upper_primary_p4__p7 as cpRatio_p4p7 from tbl_random  where name_of_school = '${nameOfSchool}' limit ${limit}`;


    let schoolArray = [];
    let cpP1top3Array = [];
    let cpP4top7Array = [];

    connection.query(cQuery, function fill(err, result,){
        if (err) throw err;
        
        //let flag = 0;
        for(let i = 0; i < result.length; i++){
          // School
          let school = result[i].schools;
  
          schoolArray.push(school)
  
          // Processing boys for each school and each class
          let cpRatio = [];
          for(let b = 1; b <= 1; b++){
            let cRatio = `cpRatio_p1p3`;
            cpRatio.push(result[i][cRatio]);
          }
          cpP1top3Array.push(cpRatio);
    
          // Processing girls for each school and each class
          let cpRatiop7 = [];
          for(let g = 1; g <= 1; g++){
            let cRatio = `cpRatio_p4p7`;
            cpRatiop7.push(result[i][cRatio]);
          }
          cpP4top7Array.push(cpRatiop7);
  
        }
  
        // console.log("SCHOOLS",schoolArray);
        // console.log("CP1TOP3", cpP1top3Array );
        // console.log("CP4TOP7",cpP4top7Array);

        let school = schoolArray[0];
        let cp1top3Plot = JSON.stringify(cpP1top3Array[0]);
        let cp4top7Plot = JSON.stringify(cpP4top7Array[0]);
  
       res.send({school: school, cp1top3: cp1top3Plot, cp4top7: cp4top7Plot})

          })
        

               
      });
module.exports = router;