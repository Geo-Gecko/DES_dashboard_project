var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:district', function (req, res, next) {

    // Get school id
    const limit = 1;

    let nameOfDistrict = req.params.district;


    // run query where school id
   
    const dQuery = `select distinct(district) as district, sum(teacherpupil_ratio_tpr_at_lower_primary_p1__p3) as tprp1p3,
    sum(teacherpupil_ratio_tpr_at_upper_primary_p4__p7) as tprp4p7 from tbl_random where district = '${nameOfDistrict}' limit ${limit}`;


    let districtArray = [];
    let p1top3Array = [];
    let p4top7Array = [];

    connection.query(dQuery, function fillGraph(err, result,){
        if (err) throw err;
        
        //let flag = 0;
        for(let i = 0; i < result.length; i++){
          // district
          let district = result[i].district;
  
          districtArray.push(district)
  
          // Processing boys for each district and each school
          let tpRatio = [];
          for(let b = 1; b <= 1; b++){
            let sRatio = `tprp1p3`;
            tpRatio.push(result[i][sRatio]);
          }
          p1top3Array.push(tpRatio);
    
          // Processing girls for each district and each school
          let tpRatiop7 = [];
          for(let g = 1; g <= 1; g++){
            let sRatio = `tprp4p7`;
            tpRatiop7.push(result[i][sRatio]);
          }
          p4top7Array.push(tpRatiop7);
  
        }
  
        // console.log("SCHOOLS",districtArray);
        // console.log("P1TOP3",p1top3Array );
        // console.log("P4P7",p4top7Array);

        let district = districtArray[0];
        let p1top3Plot = JSON.stringify(p1top3Array[0]);
        let p4top7Plot = JSON.stringify(p4top7Array[0]);
  
       res.send({district: district, p1top3: p1top3Plot, p4top7: p4top7Plot})

          })
        

               
      });

      module.exports = router;