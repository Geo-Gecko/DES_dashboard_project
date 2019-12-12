var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/', function(req, res, next) {

    const regionsQuery = "select distinct(details.region) as region FROM  ft_form_12  as inspection,  ft_form_11  as details WHERE details.submission_id=inspection.school_name";

    connection.query(regionsQuery, function(err, result) {

        let allRegion = [];

        for (let i = 0; i < result.length; i++) {
            let region = result[i].region;
            allRegion.push(region)
        }

        res.render('national', { region: allRegion });


    });

});

/* GET home page. */
router.get('/:region', function(req, res, next) {


    const limit = 10;

    let nameOfRegion = req.params.region;

    const dQuery = `select distinct(details.district) as district, 
    (select count(name_of_school) from ft_form_11 where region = '${nameOfRegion}')  as Totalschools,
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
    SELECT
        COUNT(date_of_inspection)
    FROM
        ft_form_12 AS inspection,
        ft_form_11 AS details
    WHERE
        term = 'Term1' AND region = '${nameOfRegion}'
) AS inspection_number1,
(
    SELECT
        COUNT(date_of_inspection)
    FROM
        ft_form_12 AS inspection,
        ft_form_11 AS details
    WHERE
        term = 'Term2' AND region = '${nameOfRegion}'
) AS inspection_number2,
(
    SELECT
        COUNT(date_of_inspection)
    FROM
        ft_form_12 AS inspection,
        ft_form_11 AS details
    WHERE
        term = 'Term3' AND region = '${nameOfRegion}'
) AS inspection_number3,
    DATE_FORMAT(max(inspection.date_of_inspection), '%D-%b-%Y') as last_inspection, details.region as region  FROM  ft_form_12 
     as inspection, ft_form_11  as details WHERE details.submission_id=inspection.school_name and details.region ='${nameOfRegion}' group by details.region`;



    let regionArray = [];
    let totalSchoolArray = [];
    let totalBoysArray = [];
    let totalGirlArray = [];
    let inspectionArray1 = [];
    let inspectionArray2 = [];
    let inspectionArray3 = [];
    let maxinspectionArray = [];

    connection.query(dQuery, function fill(err, result, ) {
        if (err) throw err;
        console.log('result', result)
            //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // School
            let region = result[i].region;

            regionArray.push(region)

            // Processing total schools  for each region
            let sregion = [];
            for (let d = 1; d <= 1; d++) {
                let scregion = `Totalschools`;
                sregion.push(result[i][scregion]);
            }
            totalSchoolArray.push(sregion);

            // Processing total number of boys in each region
            let regionBoys = [];
            for (let c = 1; c <= 1; c++) {
                let dboys = `TotalBoys`;
                regionBoys.push(result[i][dboys]);
            }
            totalBoysArray.push(regionBoys);

            // Processing latest inspection in each region
            let maxinspection = [];
            for (let c = 1; c <= 1; c++) {
                let regioninspection = `last_inspection`;
                maxinspection.push(result[i][regioninspection]);
            }
            maxinspectionArray.push(maxinspection);

            // Processing total number of girls in each region
            let regionGilrs = [];
            for (let s = 1; s <= 1; s++) {
                let dgilrs = `TotalGirls`;
                regionGilrs.push(result[i][dgilrs]);
            }
            totalGirlArray.push(regionGilrs);


            //processing inspection of school for each region term1
            let sInspection1 = [];
            for (let e = 1; e <= 1; e++) {
                let inspection1 = `inspection_number1`;
                sInspection1.push(result[i][inspection1]);
            }
            inspectionArray1.push(sInspection1);

             //processing inspection of schools for each region term2
             let sInspection2 = [];
             for (let e = 1; e <= 1; e++) {
                 let inspection2 = `inspection_number2`;
                 sInspection2.push(result[i][inspection2]);
             }
             inspectionArray2.push(sInspection2);

              //processing inspection of school for each region term3
            let sInspection3 = [];
            for (let e = 1; e <= 1; e++) {
                let inspection3 = `inspection_number3`;
                sInspection3.push(result[i][inspection3]);
            }
            inspectionArray3.push(sInspection3);




        }


        let region = regionArray[0];
        let totalSchoolsData = totalSchoolArray[0];
        let totalBoysData = totalBoysArray[0];
        let totalGrilsData = totalGirlArray[0];
        let inspectionData1 = inspectionArray1[0];
        let inspectionData2 = inspectionArray2[0];
        let inspectionData3 = inspectionArray3[0];
        let max_inspectionData = maxinspectionArray[0];

        let response = { region: region, school: totalSchoolsData, Boys: totalBoysData, Grils: totalGrilsData, inspection1: inspectionData1,inspection2: inspectionData2,inspection3: inspectionData3, Max_inspection: max_inspectionData }
   
        res.send(response)

    })



});


module.exports = router;