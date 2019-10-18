var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/:name_of_school', function(req, res, next) {

    
    const limit = 1;
 
   let nameOfSchool = req.params.name_of_school;

    const scQuery =`SELECT inspection.school_name as submission_id, details.name_of_school as  schools, details.emis_number as emis_number, inspection.school_location as location, details.region as region, details.district as district, details.county as county, details.sub_county as sub_county, details.parish_ward as parish, MAX(inspection.date_of_inspection) as  last_inspection, count(inspection.date_of_inspection) as inspection_number FROM  ft_form_12  as inspection,  ft_form_11  as details WHERE details.submission_id=inspection.school_name `;


    
    let schoolArray = [];
    let districtArray = [];
    let countyArray = [];
    let subcountyArray =[];
    let parishArray =[];
    let emisArray =[];
    let regionOfSchoolArray =[];
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
         let sEmis = [];
        for(let e = 1; e <= 1; e++){
          let emis_numer = `emis_number`;
          sEmis.push(result[i][emis_numer ]);
        }
        emisArray.push(sEmis);

        //processing level of school for all school
        let sRegion = [];
        for(let e = 1; e <= 1; e++){
          let region = `region`;
          sRegion.push(result[i][region]);
        }
        regionOfSchoolArray.push(sRegion);


        //processing inspection of school for all school
        let sInspection = [];
        for(let e = 1; e <= 1; e++){
          let inspection = `inspection_number`;
          sInspection.push(result[i][inspection ]);
        }
        inspectionArray.push(sInspection);



      }

      console.log("SCHOOLS",schoolArray);
      console.log("DISTRICT", districtArray );
      console.log("COUNTY",countyArray);
      console.log("SUBCOUNTY", subcountyArray);
      console.log("PARISH", parishArray);
      console.log("INSPECTION", inspectionArray);
      console.log("lastest inspection", maxinspectionArray);

      let school = schoolArray[0];
      let distinctData = districtArray[0];
      let countyData = countyArray[0];
      let subcountyData = subcountyArray[0];
      let parishData = parishArray[0];
      let emisData = emisArray[0];
      let regionData  = regionOfSchoolArray[0];
      let inspectionData = inspectionArray[0];
      let maxinspectionData = maxinspectionArray[0];


     res.send({school: school, district: distinctData, county: countyData, subcounty: subcountyData, parish:  parishData, emisNumber: emisData, region: regionData, inspection:  inspectionData, max_inspection: maxinspectionData})

        })
      

             
    });


module.exports = router;















