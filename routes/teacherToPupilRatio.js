var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/stats/:name_of_school', function (req, res, next) {

    // Get school id
    let nameOfSchool = req.params.name_of_school;


    // run query where school id
    const limit = 1;
    const rQuery = `select distinct(name_of_school) as schools, teacherpupil_ratio_tpr_at_lower_primary_p1__p3 as tpRatio_p1p3, 
    teacherpupil_ratio_tpr_at_upper_primary_p4__p7 as tpRatio_p4p7 from tbl_random where name_of_school = '${nameOfSchool}' limit ${limit}`;


    let schoolsArray = [];
    let p1top3Array = [];
    let p4top7Array = [];

    connection.query(rQuery, function fillGraph(err, result,){
        if (err) throw err;
        
        //let flag = 0;
        for(let i = 0; i < result.length; i++){
          // School
          let school = result[i].schools;
  
          schoolsArray.push(school)
  
          // Processing boys for each school and each class
          let tpRatio = [];
          for(let b = 1; b <= 1; b++){
            let sRatio = `tpRatio_p1p3`;
            tpRatio.push(result[i][sRatio]);
          }
          p1top3Array.push(tpRatio);
    
          // Processing girls for each school and each class
          let tpRatiop7 = [];
          for(let g = 1; g <= 1; g++){
            let sRatio = `tpRatio_p4p7`;
            tpRatiop7.push(result[i][sRatio]);
          }
          p4top7Array.push(tpRatiop7);
  
        }
  
        // console.log("SCHOOLS",schoolsArray);
        // console.log("P1TOP3",p1top3Array );
        // console.log("P4P7",p4top7Array);

        let school = schoolsArray[0];
        let p1top3Plot = JSON.stringify(p1top3Array[0]);
        let p4top7Plot = JSON.stringify(p4top7Array[0]);
  
       res.send({school: school, p1top3: p1top3Plot, p4top7: p4top7Plot})

          })
        

               
      });

      module.exports = router;