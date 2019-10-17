var express = require('express');
var router = express.Router();
var connection = require('../config/database');



/* GET home page. */
router.get('/:name_of_school', function(req, res, next) {

    
    // Get school id
    let nameOfSchool = req.params.name_of_school;


    // run query where school id
    const limit = 1;
    const cQuery = `select distinct(name_of_school) as schools, stancepupil_ratio_spr_boys as spr_boys, stancepupil_ratio_spr_girls as spr_girls, stancepupil_ratio_spr_overall as spr_overall from tbl_random  where name_of_school = '${nameOfSchool}' limit ${limit}`;


    let schoolArray = [];
    let sprboysArray = [];
    let sprgirlsArray = [];
    let sproverallArray =[];

    connection.query(cQuery, function fill(err, result,){
        if (err) throw err;
        
        //let flag = 0;
        for(let i = 0; i < result.length; i++){
          // School
          let school = result[i].schools;
  
          schoolArray.push(school)
  
          // Processing boys for stance ratio
          let srRatio = [];
          for(let b = 1; b <= 1; b++){
            let sRatio = `spr_boys`;
            srRatio.push(result[i][sRatio]);
          }
          sprboysArray.push(srRatio);
    
          // Processing girls for stance ratio
          let srRatiop7 = [];
          for(let g = 1; g <= 1; g++){
            let sRatio = `spr_girls`;
            srRatiop7.push(result[i][sRatio]);
          }
          sprgirlsArray.push(srRatiop7);

           // Processing stance for overall 
           let srRatiop8 = [];
          for(let a = 1; a <= 1; a++){
            let sRatio = `spr_overall`;
            srRatiop8.push(result[i][sRatio]);
          }
          sproverallArray.push(srRatiop7);
        }
  
        // console.log("SCHOOLS",schoolArray);
        // console.log("SPRBOYS", sprboysArray );
        // console.log("SPRGIRLS",sprgirlsArray);
        // console.log("SPROVERALL", sproverallArray);

        let school = schoolArray[0];
        let sprboysPlot = JSON.stringify(sprboysArray[0]);
        let sprgirlsPlot = JSON.stringify(sprgirlsArray[0]);
        let sproverallPlot = JSON.stringify(sproverallArray[0]);
  
       res.send({school: school, sprboys: sprboysPlot, sprgirls: sprgirlsPlot, sproverall: sproverallPlot})

          })
        

               
      });

      module.exports = router;