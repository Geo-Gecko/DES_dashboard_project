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

    const dQuery = `select distinct(details.region) as region, (select count(name_of_school) from ft_form_11 where region = '${nameOfRegion}')  as Totalschools,
    sum(inspection.number_of_boys_enrolled_in_p1)+sum(inspection.number_of_girls_enrolled_in_p1)+sum(inspection.number_of_boys_enrolled_in_p2)+
    sum(inspection.number_of_girls_enrolled_in_p2)+sum(inspection.number_of_boys_enrolled_in_p3)+sum(inspection.number_of_girls_enrolled_in_p3)+
    sum(inspection.number_of_boys_enrolled_in_p4)+sum(inspection.number_of_girls_enrolled_in_p4)+sum(inspection.number_of_boys_enrolled_in_p5)+
    sum(inspection.number_of_girls_enrolled_in_p5)+sum(inspection.number_of_boys_enrolled_in_p6)+sum(inspection.number_of_girls_enrolled_in_p6)+sum(inspection.number_of_boys_enrolled_in_p7) +sum(inspection.number_of_girls_enrolled_in_p7) as Total, sum(inspection.number_of_boys_enrolled_in_p1)+sum(inspection.number_of_boys_enrolled_in_p2)+sum(inspection.number_of_boys_enrolled_in_p3)+sum(inspection.number_of_boys_enrolled_in_p4)+
    sum(inspection.number_of_boys_enrolled_in_p5)+sum(inspection.number_of_boys_enrolled_in_p6)+sum(inspection.number_of_boys_enrolled_in_p7) as TotalBoys, sum(inspection.number_of_girls_enrolled_in_p1)+sum(inspection.number_of_girls_enrolled_in_p2)+sum(inspection.number_of_girls_enrolled_in_p3)+
    sum(inspection.number_of_girls_enrolled_in_p4)+sum(inspection.number_of_girls_enrolled_in_p5)+sum(inspection.number_of_girls_enrolled_in_p6)+sum(inspection.number_of_girls_enrolled_in_p7)  as TotalGirls, count(inspection.date_of_inspection) as inspection_number,
    DATE_FORMAT(max(inspection.date_of_inspection), '%D-%b-%Y') as last_inspection  FROM  ft_form_12  as inspection,  ft_form_11  as details WHERE details.submission_id=inspection.school_name and details.region='${nameOfRegion}' group by details.region`;



    let regionArray = [];
    let totalSchoolArray = [];
    let totalBoysArray = [];
    let totalGirlArray = [];
    let totalInspection = [];
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


            // Processing total number of inspection in each region
            let regionInspection = [];
            for (let s = 1; s <= 1; s++) {
                let rinspection = `inspection_number`;
                regionInspection.push(result[i][rinspection]);
            }
            totalInspection.push(regionInspection);



        }

        // console.log("NATIONAL", regionArray);
        // console.log("TOTAL SCHOOLS", totalSchoolArray );
        // console.log("TOTAL BOYS", totalBoysArray);
        // console.log("TOTAL GIRLS", totalGirlArray);
        // console.log("TOTAL NUMBER OF INSPECTION", totalInspection )
        //console.log("the latest inspection",  maxinspectionArray);


        let region = regionArray[0];
        let totalSchoolsData = totalSchoolArray[0];
        let totalBoysData = totalBoysArray[0];
        let totalGrilsData = totalGirlArray[0];
        let totalInspectionData = totalInspection[0];
        let max_inspectionData = maxinspectionArray[0];

        let response = { region: region, school: totalSchoolsData, Boys: totalBoysData, Grils: totalGrilsData, Inspection: totalInspectionData, Max_inspection: max_inspectionData }
        // console.log('response', response)
        res.send(response)

    })



});


module.exports = router;