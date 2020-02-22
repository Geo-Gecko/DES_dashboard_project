var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/:name_of_school/:year', function(req, res, next) {


    const limit = 1;

    let nameOfSchool = req.params.name_of_school;
    let year = req.params.year;

    const scQuery = `SELECT DISTINCT
    (details.name_of_school) AS schools,
    details.emis_number AS emis_number,
    inspection.school_location AS location,
    details.region AS region,
    details.district AS district,
    details.county AS county,
    details.sub_county AS sub_county,
    details.parish_ward AS parish,
    DATE_FORMAT(
        MAX(inspection.date_of_inspection),
        '%d-%b-%Y'
    ) AS last_inspection,
    (
    (
    SELECT DISTINCT
    COUNT(inspection.date_of_inspection) AS inspection_number
FROM
    ft_form_12 AS inspection,
    ft_form_11 AS details
WHERE
    details.submission_id = inspection.school_name and inspection.term='Term1' and details.name_of_school='${nameOfSchool}'
GROUP BY details.name_of_school
)
) AS inspection_number1,
(
     SELECT DISTINCT
    COUNT(inspection.date_of_inspection) AS inspection_number
FROM
    ft_form_12 AS inspection,
    ft_form_11 AS details
WHERE
    details.submission_id = inspection.school_name and inspection.term='Term2' and details.name_of_school='${nameOfSchool}'
GROUP BY details.name_of_school
) AS inspection_number2,
(
     SELECT DISTINCT
    COUNT(inspection.date_of_inspection) AS inspection_number
FROM
    ft_form_12 AS inspection,
    ft_form_11 AS details
WHERE
    details.submission_id = inspection.school_name and inspection.term='Term3' and details.name_of_school='${nameOfSchool}'
GROUP BY details.name_of_school
) AS inspection_number3
FROM
    ft_form_12 AS inspection,
    ft_form_11 AS details
WHERE
    details.submission_id = inspection.school_name AND details.name_of_school = '${nameOfSchool}' AND DATE_FORMAT(inspection.date_of_inspection,'%Y') = '${year}'
GROUP BY
    details.name_of_school`;



    let schoolArray = [];
    let districtArray = [];
    let countyArray = [];
    let subcountyArray = [];
    let parishArray = [];
    let emisArray = [];
    let regionOfSchoolArray = [];
    let inspectionArray1 = [];
    let inspectionArray2 = [];
    let inspectionArray3 = [];
    let maxinspectionArray = [];

    connection.query(scQuery, function fill(err, result, ) {
        if (err) throw err;
        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // School
            let school = result[i].schools;

            schoolArray.push(school)

            // Processing district for each school
            let sdistrict = [];
            for (let d = 1; d <= 1; d++) {
                let scdistrict = `district`;
                sdistrict.push(result[i][scdistrict]);
            }
            districtArray.push(sdistrict);

            // Processing county for all school
            let scounty = [];
            for (let c = 1; c <= 1; c++) {
                let sccounty = `county`;
                scounty.push(result[i][sccounty]);
            }
            countyArray.push(scounty);


            // Processing lastest inspection for all school
            let maxinspection = [];
            for (let c = 1; c <= 1; c++) {
                let sinspection = `last_inspection`;
                maxinspection.push(result[i][sinspection]);
            }
            maxinspectionArray.push(maxinspection);

            // Processing sub county for all school  
            let sSubCounty = [];
            for (let s = 1; s <= 1; s++) {
                let Sub = `sub_county`;
                sSubCounty.push(result[i][Sub]);
            }
            subcountyArray.push(sSubCounty);

            // Processing parish for all school 
            let sParish = [];
            for (let s = 1; s <= 1; s++) {
                let parish = `parish`;
                sParish.push(result[i][parish]);
            }
            parishArray.push(sParish);

            // Processing status for all school 
            let sEmis = [];
            for (let e = 1; e <= 1; e++) {
                let emis_numer = `emis_number`;
                sEmis.push(result[i][emis_numer]);
            }
            emisArray.push(sEmis);

            //processing level of school for all school
            let sRegion = [];
            for (let e = 1; e <= 1; e++) {
                let region = `region`;
                sRegion.push(result[i][region]);
            }
            regionOfSchoolArray.push(sRegion);


            //processing inspection of school for all school term1
            let sInspection1 = [];
            for (let e = 1; e <= 1; e++) {
                let inspection1 = `inspection_number1`;
                sInspection1.push(result[i][inspection1]);
            }
            inspectionArray1.push(sInspection1);

             //processing inspection of school for all school term2
             let sInspection2 = [];
             for (let e = 1; e <= 1; e++) {
                 let inspection2 = `inspection_number2`;
                 sInspection2.push(result[i][inspection2]);
             }
             inspectionArray2.push(sInspection2);

              //processing inspection of school for all school term3
            let sInspection3 = [];
            for (let e = 1; e <= 1; e++) {
                let inspection3 = `inspection_number3`;
                sInspection3.push(result[i][inspection3]);
            }
            inspectionArray3.push(sInspection3);



        }

        let school = schoolArray[0];
        let distinctData = districtArray[0];
        let countyData = countyArray[0];
        let subcountyData = subcountyArray[0];
        let parishData = parishArray[0];
        let emisData = emisArray[0];
        let regionData = regionOfSchoolArray[0];
        let inspectionData1 = inspectionArray1[0];
        let inspectionData2 = inspectionArray2[0];
        let inspectionData3 = inspectionArray3[0];
        let maxinspectionData = maxinspectionArray[0];


        res.send({ school: school, district: distinctData, county: countyData, subcounty: subcountyData, parish: parishData, emisNumber: emisData, region: regionData, inspection1: inspectionData1,inspection2: inspectionData2,inspection3: inspectionData3, max_inspection: maxinspectionData })

    })



});


module.exports = router;