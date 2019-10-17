var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/:name_of_school', function(req, res, next) {

    
    const limit = 1;

    let nameOfSchool = req.params.name_of_school;

    const scQuery =`select distinct(name_of_school) as schools, district as district, county as county, subcounty as subcounty, parish as parish, school_status as status, level_of_school as level, name_of_ht as ht, ht_gender as gender, count(inspection_date) as inspection_number, max(inspection_date) as last_inspection from tbl_random where name_of_school = '${nameOfSchool}' group by name_of_school limit ${limit}`;


    
    let schoolArray = [];
    let districtArray = [];
    let countyArray = [];
    let subcountyArray =[];
    let parishArray =[];
    let statusArray =[];
    let levelOfSchoolArray =[];
    let inspectionArray = [];
    let maxinspectionArray = [];

    connection.query(scQuery, function fill(err, result,){
        if (err) throw err;
       //let flag = 0;
       for(let i = 0; i < result.length; i++){
        // School
        let school = result[i].schools;

        schoolArray.push(school)

        // Processing district for each school
        let sdistrict = [];
        for(let d = 1; d <= 1; d++){
          let scdistrict = `district`;
          sdistrict.push(result[i][scdistrict]);
        }
        districtArray.push(sdistrict);
  
        // Processing county for all school
        let scounty = [];
        for(let c = 1; c <= 1; c++){
          let sccounty = `county`;
          scounty.push(result[i][sccounty]);
        }
        countyArray.push(scounty);


        // Processing lastest inspection for all school
        let maxinspection = [];
        for(let c = 1; c <= 1; c++){
          let sinspection = `last_inspection`;
          maxinspection.push(result[i][sinspection]);
        }
        maxinspectionArray.push(maxinspection);

         // Processing sub county for all school  
         let sSubCounty = [];
        for(let s = 1; s <= 1; s++){
          let Sub = `subcounty`;
          sSubCounty.push(result[i][ Sub ]);
        }
        subcountyArray.push( sSubCounty);

         // Processing parish for all school 
         let sParish= [];
        for(let s = 1; s <= 1; s++){
          let parish = `parish`;
          sParish.push(result[i][parish ]);
        }
        parishArray.push(sParish);

         // Processing status for all school 
         let sStatus = [];
        for(let e = 1; e <= 1; e++){
          let status = `status`;
          sStatus.push(result[i][status ]);
        }
        statusArray.push(sStatus);

        //processing level of school for all school
        let sLevel = [];
        for(let e = 1; e <= 1; e++){
          let level = `level`;
          sLevel.push(result[i][level ]);
        }
        levelOfSchoolArray.push(sLevel);


        //processing inspection of school for all school
        let sInspection = [];
        for(let e = 1; e <= 1; e++){
          let inspection = `inspection_number`;
          sInspection.push(result[i][inspection ]);
        }
        inspectionArray.push(sInspection);



      }

      // console.log("SCHOOLS",schoolArray);
      // console.log("DISTRICT", districtArray );
      // console.log("COUNTY",countyArray);
      // console.log("SUBCOUNTY", subcountyArray);
      // console.log("PARISH", parishArray);
      // console.log("INSPECTION", inspectionArray);
      //console.log("lastest inspection", maxinspectionArray);

      let school = schoolArray[0];
      let distinctData = districtArray[0];
      let countyData = countyArray[0];
      let subcountyData = subcountyArray[0];
      let parishData = parishArray[0];
      let statusData = statusArray[0];
      let levelData  = levelOfSchoolArray[0];
      let inspectionData = inspectionArray[0];
      let maxinspectionData = maxinspectionArray[0];


     res.send({school: school, district: distinctData, county: countyData, subcounty: subcountyData, parish:  parishData, status: statusData, level: levelData, inspection:  inspectionData, max_inspection: maxinspectionData})

        })
      

             
    });


module.exports = router;















