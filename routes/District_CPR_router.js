var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:district', function (req, res, next) {

    // Get school id
    const limit = 1;

    let nameOfDistrict = req.params.district;


    // run query where school id
   
    const dQuery = `select distinct(district) as district, sum(classroompupil_ratio_cpr_at_lower_primary_p1__p3) as cprp1p3, sum(classroompupil_ratio_cpr_at_upper_primary_p4__p7) as cprp4p7 from tbl_random where district = '${nameOfDistrict}' limit ${limit}`;


    

    let districtArray = [];
    let cpP1top3Array = [];
    let cpP4top7Array = [];

    connection.query(dQuery, function fill(err, result,){
        if (err) throw err;
        
        //let flag = 0;
        for(let i = 0; i < result.length; i++){
          // district
          let district = result[i].district;
  
          districtArray.push(district)
  
          // Processing boys for each school and each class
          let cpRatio = [];
          for(let b = 1; b <= 1; b++){
            let cRatio = `cprp1p3`;
            cpRatio.push(result[i][cRatio]);
          }
          cpP1top3Array.push(cpRatio);
    
          // Processing girls for each school and each class
          let cpRatiop7 = [];
          for(let g = 1; g <= 1; g++){
            let cRatio = `cprp4p7`;
            cpRatiop7.push(result[i][cRatio]);
          }
          cpP4top7Array.push(cpRatiop7);
  
        }
  
        // console.log("DISTRICT",districtArray);
        // console.log("CP1TOP3", cpP1top3Array );
        // console.log("CP4TOP7",cpP4top7Array);

        let district = districtArray[0];
        let cp1top3Plot = JSON.stringify(cpP1top3Array[0]);
        let cp4top7Plot = JSON.stringify(cpP4top7Array[0]);
  
       res.send({district: district, cp1top3: cp1top3Plot, cp4top7: cp4top7Plot})

          })
        

               
      });

      module.exports = router;