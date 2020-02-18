var express = require('express');
var router = express.Router();
var connection = require('../config/database');


/* GET home page. */
router.get('/', function(req, res, next) {

    const schoolsQuery = "select distinct(details.name_of_school) as school  FROM  ft_form_12  as inspection, ft_form_11 as details  WHERE details.submission_id = inspection.school_name ";

    connection.query(schoolsQuery, function(err, result) {

        let allSchools = [];

        for (let i = 0; i < result.length; i++) {
            let school = result[i].school;
            allSchools.push(school)
        }
        res.render('dashboard', { schools: allSchools });


    });

});

/* Get Year */
router.get('/years', function(req, res, next) {

    const yearQuery = "select distinct(DATE_FORMAT(inspection.date_of_inspection,'%Y')) as year  FROM  ft_form_12  as inspection, ft_form_11 as details  WHERE details.submission_id = inspection.school_name ";

  
    connection.query(yearQuery, function(err, result) {

        let allYears = [];

        for (let i = 0; i < result.length; i++) {
            let year = result[i].year;
            allYears.push(year)
        }
        res.send( { "years": allYears });


    });

});



router.get('/enrollment-stats/:name_of_school', function(req, res, next) {

    // Get school id
    let nameOfSchool = req.params.name_of_school;


    // run query where school id
    // const limit = 5;
    const aQuery = `SELECT inspection.school_name, details.name_of_school as name_of_school,
     details.emis_number as emis_number, inspection.number_of_boys_enrolled_in_p1  as p1boys,
      inspection. number_of_girls_enrolled_in_p1  as p1girls, 
      inspection.number_of_boys_enrolled_in_p2  as p2boys, 
      inspection.number_of_girls_enrolled_in_p2  as p2girls,
       inspection.number_of_boys_enrolled_in_p3  as p3boys, 
       inspection.number_of_girls_enrolled_in_p3  as p3girls, 
       inspection.number_of_boys_enrolled_in_p4  as p4boys, 
       inspection.number_of_girls_enrolled_in_p4  as p4girls,
        inspection.number_of_boys_enrolled_in_p5  as p5boys,
         inspection.number_of_girls_enrolled_in_p5  as p5girls,
          inspection.number_of_boys_enrolled_in_p6  as p6boys, 
          inspection.number_of_girls_enrolled_in_p6  as p6girls,
           inspection.number_of_boys_enrolled_in_p7  as p7boys, 
           inspection.number_of_girls_enrolled_in_p7  as p7girls
            FROM  ft_form_12  as inspection, ft_form_11 as details 
            WHERE details.submission_id=inspection.school_name  and details.name_of_school ='${nameOfSchool}'
             group by  details.name_of_school;`;

    connection.query(aQuery, function fillGraph(err, result, ) {
        if (err) throw err;
        let schoolsArray = [];
        let schoolBoysArray = [];
        let schoolGirlsArray = [];
        let emisArray = [];
        // let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // School
            let school = result[i].schools;

            schoolsArray.push(school)

            // Processing boys for each school and each class
            let boysArray = [];
            for (let b = 1; b <= 7; b++) {
                let sClass = `p${b}boys`;
                boysArray.push(result[i][sClass]);
            }
            schoolBoysArray.push(boysArray);

            // Processing girls for each school and each class
            let girlsArray = [];
            for (let g = 1; g <= 7; g++) {
                let sClass = `p${g}girls`;
                girlsArray.push(result[i][sClass]);
            }
            schoolGirlsArray.push(girlsArray);

        }

        let school = schoolsArray[0];
        let boysPlot = schoolBoysArray[0];
        let girlsPlot = schoolGirlsArray[0];

        res.send({ school: school, boys: boysPlot, girls: girlsPlot })

    })

});



module.exports = router;