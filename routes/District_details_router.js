var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/', function(req, res, next) {

    const districtsQuery = "select distinct(details.district) as district  FROM  ft_form_12  as inspection, ft_form_11 as details WHERE details.submission_id = inspection.school_name";

    connection.query(districtsQuery, function(err, result) {

        let allDistricts = [];

        for (let i = 0; i < result.length; i++) {
            let district = result[i].district;
            allDistricts.push(district)
        }


        console.log(allDistricts)

        res.render('district', { district: allDistricts });



    });

});

/* GET home page. */
router.get('/:district', function(req, res, next) {


    const limit = 10;

    let nameOfDistrict = req.params.district;

    const dQuery = `SELECT DISTINCT
    (details.district) AS district,
    (select count(name_of_school) from ft_form_11 where district = '${nameOfDistrict}')  as Totalschools,
    sum(inspection.number_of_boys_enrolled_in_p1)+
    sum(inspection.number_of_girls_enrolled_in_p1)+
    sum(inspection.number_of_boys_enrolled_in_p2)+
    sum(inspection.number_of_girls_enrolled_in_p2)+
    sum(inspection.number_of_boys_enrolled_in_p3)+
    sum(inspection.number_of_girls_enrolled_in_p3)+
    sum(inspection.number_of_boys_enrolled_in_p4)+
    sum(inspection.number_of_girls_enrolled_in_p4)+
    sum(inspection.number_of_boys_enrolled_in_p5)+
    sum(inspection.number_of_girls_enrolled_in_p5)+
    sum(inspection.number_of_boys_enrolled_in_p6)+
    sum(inspection.number_of_girls_enrolled_in_p6)+
    sum(inspection.number_of_boys_enrolled_in_p7) +
    sum(inspection.number_of_girls_enrolled_in_p7) as Total, 
    sum(inspection.number_of_boys_enrolled_in_p1)+
    sum(inspection.number_of_boys_enrolled_in_p2)+
    sum(inspection.number_of_boys_enrolled_in_p3)+
    sum(inspection.number_of_boys_enrolled_in_p4)+
    sum(inspection.number_of_boys_enrolled_in_p5)+
    sum(inspection.number_of_boys_enrolled_in_p6)+
    sum(inspection.number_of_boys_enrolled_in_p7) as TotalBoys,
     sum(inspection.number_of_girls_enrolled_in_p1)+
     sum(inspection.number_of_girls_enrolled_in_p2)+
     sum(inspection.number_of_girls_enrolled_in_p3)+
    sum(inspection.number_of_girls_enrolled_in_p4)+
    sum(inspection.number_of_girls_enrolled_in_p5)+
    sum(inspection.number_of_girls_enrolled_in_p6)+
    sum(inspection.number_of_girls_enrolled_in_p7)  as TotalGirls, 
     DATE_FORMAT(
        MAX(inspection.date_of_inspection),
        '%d-%b-%Y'
    ) AS last_inspection,
(
    SELECT DISTINCT
    COUNT(inspection.date_of_inspection) AS inspection_number
FROM
    ft_form_12 AS inspection,
    ft_form_11 AS details
WHERE
    details.submission_id = inspection.school_name and inspection.term='Term1' and details.district='${nameOfDistrict}'
GROUP BY details.district
) AS inspection_number1,
(
   SELECT DISTINCT
    COUNT(inspection.date_of_inspection) AS inspection_number
FROM
    ft_form_12 AS inspection,
    ft_form_11 AS details
WHERE
    details.submission_id = inspection.school_name and inspection.term='Term2' and details.district='${nameOfDistrict}'
GROUP BY details.district
) AS inspection_number2,
(
   SELECT DISTINCT
    COUNT(inspection.date_of_inspection) AS inspection_number
FROM
    ft_form_12 AS inspection,
    ft_form_11 AS details
WHERE
    details.submission_id = inspection.school_name and inspection.term='Term3' and details.district='${nameOfDistrict}'
GROUP BY details.district
) AS inspection_number3,
DATE_FORMAT(
    MAX(inspection.date_of_inspection),
    '%D-%b-%Y'
) AS last_inspection,
details.region AS region
FROM
    ft_form_12 AS inspection,
    ft_form_11 AS details
WHERE
    details.submission_id = inspection.school_name AND details.district = '${nameOfDistrict}'
GROUP BY
    details.district`;


    let districtArray = [];
    let regionArray =[];
    let totalSchoolArray = [];
    let totalBoysArray = [];
    let totalGirlArray = [];
    let inspectionArray1 = [];
    let inspectionArray2 = [];
    let inspectionArray3 = [];
    let maxInspectionArray = [];

    connection.query(dQuery, function fill(err, result, ) {
        if (err) throw err;
        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // District and region
            let district = result[i].district;
            let region = result[i].region;

            districtArray.push(district);
            regionArray.push(region);
         

            // Processing total schools  for each district
            let sdistrict = [];
            for (let d = 1; d <= 1; d++) {
                let scdistrict = `Totalschools`;
                sdistrict.push(result[i][scdistrict]);
            }
            totalSchoolArray.push(sdistrict);

            // Processing total number of boys in each district 
            let districtBoys = [];
            for (let c = 1; c <= 1; c++) {
                let dboys = `TotalBoys`;
                districtBoys.push(result[i][dboys]);
            }
            totalBoysArray.push(districtBoys);

            // Processing total number of girls in each district 
            let districtGilrs = [];
            for (let s = 1; s <= 1; s++) {
                let dgilrs = `TotalGirls`;
                districtGilrs.push(result[i][dgilrs]);
            }
            totalGirlArray.push(districtGilrs);

            //processing inspection of school for each district term1
            let sInspection1 = [];
            for (let e = 1; e <= 1; e++) {
                let inspection1 = `inspection_number1`;
                sInspection1.push(result[i][inspection1]);
            }
            inspectionArray1.push(sInspection1);

             //processing inspection of schools for each district term2
             let sInspection2 = [];
             for (let e = 1; e <= 1; e++) {
                 let inspection2 = `inspection_number2`;
                 sInspection2.push(result[i][inspection2]);
             }
             inspectionArray2.push(sInspection2);

              //processing inspection of school for each district term3
            let sInspection3 = [];
            for (let e = 1; e <= 1; e++) {
                let inspection3 = `inspection_number3`;
                sInspection3.push(result[i][inspection3]);
            }
            inspectionArray3.push(sInspection3);

            // Processing latest inspection in each district 
            let latestInspection = [];
            for (let s = 1; s <= 1; s++) {
                let maxinspection = `last_inspection`;
                latestInspection.push(result[i][maxinspection]);
            }
            maxInspectionArray.push(latestInspection);

        }


        let district_req = districtArray[0];
        let region_req = regionArray[0];
        let totalSchoolsData = totalSchoolArray[0];
        let totalBoysData = totalBoysArray[0];
        let totalGrilsData = totalGirlArray[0];
        let inspectionData1 = inspectionArray1[0];
        let inspectionData2 = inspectionArray2[0];
        let inspectionData3 = inspectionArray3[0];
        let max_inspectionData = maxInspectionArray[0];
        console.log(region_req)


        res.send({ district: district_req, region: region_req, school: totalSchoolsData, Boys: totalBoysData, Grils: totalGrilsData, inspection1: inspectionData1,inspection2: inspectionData2,inspection3: inspectionData3, max_inspection: max_inspectionData })

    })



});


module.exports = router;