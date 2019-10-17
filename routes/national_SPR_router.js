var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:region', function (req, res, next) {

    // Get school id
    const limit = 1;

    let nameOfRegion = req.params.region;


    // run query where school id
    
    const dQuery = `select distinct(region) as region, sum(stancepupil_ratio_spr_boys) as spr_boys, 
    sum(stancepupil_ratio_spr_girls) as spr_girls, sum(stancepupil_ratio_spr_overall) as spr_overall from tbl_random  where region = '${nameOfRegion}' limit ${limit}`;


    let regionArray = [];
    let sprboysArray = [];
    let sprgirlsArray = [];
    let sproverallArray =[];

    connection.query(dQuery, function fill(err, result,){
        if (err) throw err;
        
        //let flag = 0;
        for(let i = 0; i < result.length; i++){
          // district 
          let region = result[i].region;
  
          regionArray.push(region)
  
          // Processing boys for stance ratio for district 
          let srRatio = [];
          for(let b = 1; b <= 1; b++){
            let sRatio = `spr_boys`;
            srRatio.push(result[i][sRatio]);
          }
          sprboysArray.push(srRatio);
    
          // Processing girls for stance ratio for district 
          let srRatiop7 = [];
          for(let g = 1; g <= 1; g++){
            let sRatio = `spr_girls`;
            srRatiop7.push(result[i][sRatio]);
          }
          sprgirlsArray.push(srRatiop7);

           // Processing stance for overall for district 
           let srRatiop8 = [];
          for(let a = 1; a <= 1; a++){
            let sRatio = `spr_overall`;
            srRatiop8.push(result[i][sRatio]);
          }
          sproverallArray.push(srRatiop7);
        }
  
        // console.log("REGION", regionArray);
        // console.log("SPRBOYS", sprboysArray );
        // console.log("SPRGIRLS",sprgirlsArray);
        // console.log("SPROVERALL", sproverallArray);

        let region = regionArray[0];
        let sprboysPlot = JSON.stringify(sprboysArray[0]);
        let sprgirlsPlot = JSON.stringify(sprgirlsArray[0]);
        let sproverallPlot = JSON.stringify(sproverallArray[0]);
  
       res.send({region: region, sprboys: sprboysPlot, sprgirls: sprgirlsPlot, sproverall: sproverallPlot})

          })
        

               
      });

      module.exports = router;