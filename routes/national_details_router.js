var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/', function (req, res, next) {

    const regionsQuery = "select distinct(region) as region from tbl_random";

    connection.query(regionsQuery, function (err, result) {

        let allRegion = [];

        for (let i = 0; i < result.length; i++) {
            let region = result[i].region;
            allRegion.push(region)
        }

        res.render('national', {region: allRegion});


    });

});

/* GET home page. */
router.get('/:region', function(req, res, next) {

    
    const limit = 10;

    let nameOfRegion = req.params.region;

    const dQuery =`select distinct(region) as region, count(name_of_school), sum(p1__enrolment__boys)+sum(p1__enrolment__girls)+
    sum(p2__enrolment__boys) + sum(p2__enrolment__girls) +sum(p3__enrolment__boys)+
    sum(p3__enrolment__girls) +sum(p4__enrolment__boys) +
    sum(p4__enrolment__girls)+sum(p5__enrolment__boys) +
    sum(p5__enrolment__girls) +sum(p6__enrolment__boys)+ sum(p6__enrolment__girls)+ 
    sum(p7__enrolment__boys) + sum(p7__enrolment__girls) as Total, sum(p1__enrolment__boys) + 
    sum(p2__enrolment__boys)+ sum(p3__enrolment__boys) + sum(p4__enrolment__boys)+sum(p5__enrolment__boys) +
    sum(p6__enrolment__boys) +sum(p7__enrolment__boys) as Total_boys, sum(p1__enrolment__girls) +
    sum(p2__enrolment__girls) + sum(p3__enrolment__girls) +
    sum(p4__enrolment__girls)+ sum(p5__enrolment__girls) +sum(p6__enrolment__girls) + sum(p7__enrolment__girls) as Total_girls, count(inspection_date) as inspection_number, 
    max(inspection_date) as last_inspection from
    tbl_random where region = '${nameOfRegion}' group by region limit ${limit}`;


    
    let regionArray = [];
    let totalSchoolArray = [];
    let totalBoysArray = [];
    let totalGirlArray =[];
    let totalInspection = [];
    let maxinspectionArray = [];
    
    connection.query(dQuery, function fill(err, result,){
        if (err) throw err;
       //let flag = 0;
       for(let i = 0; i < result.length; i++){
        // School
        let region = result[i].region;

        regionArray.push(region)

        // Processing total schools  for each region
        let sregion = [];
        for(let d = 1; d <= 1; d++){
          let scregion = `Total`;
          sregion.push(result[i][scregion]);
        }
        totalSchoolArray.push(sregion);
  
        // Processing total number of boys in each region
        let regionBoys = [];
        for(let c = 1; c <= 1; c++){
          let dboys = `Total_boys`;
          regionBoys.push(result[i][dboys]);
        }
        totalBoysArray.push(regionBoys);

          // Processing latest inspection in each region
          let maxinspection = [];
          for(let c = 1; c <= 1; c++){
            let regioninspection = `last_inspection`;
            maxinspection.push(result[i][regioninspection]);
          }
          maxinspectionArray.push(maxinspection);

         // Processing total number of girls in each region
         let regionGilrs = [];
        for(let s = 1; s <= 1; s++){
          let dgilrs = `Total_girls`;
          regionGilrs.push(result[i][dgilrs]);
        }
        totalGirlArray.push(regionGilrs);

        
         // Processing total number of inspection in each region
         let regionInspection = [];
        for(let s = 1; s <= 1; s++){
          let rinspection = `Total_girls`;
          regionInspection.push(result[i][rinspection]);
        }
        totalInspection.push(regionGilrs);

         

      }

      // console.log("NATIONAL", regionArray);
      // console.log("TOTAL SCHOOLS", totalSchoolArray );
      // console.log("TOTAL BOYS", totalBoysArray);
      // console.log("TOTAL GIRLS", totalGirlArray);
      // console.log("TOTAL NUMBER OF INSPECTION", totalInspection )
      //console.log("the latest inspection",  maxinspectionArray);
      

      let region = regionArray[0];
      let totalSchoolsData =  totalSchoolArray[0];
      let totalBoysData = totalBoysArray[0];
      let totalGrilsData =  totalGirlArray[0];
      let totalInspectionData = totalInspection[0];
      let max_inspectionData =  maxinspectionArray[0];

     res.send({region: region, school: totalSchoolsData, Boys: totalBoysData, Grils: totalGrilsData, Inspection: totalInspectionData, Max_inspection: max_inspectionData})

        })
      

             
    });


module.exports = router;















