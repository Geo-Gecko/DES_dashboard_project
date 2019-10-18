var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/', function (req, res, next) {

    const schoolsQuery = "SELECT details.name_of_school as school FROM  ft_form_12  as inspection,  ft_form_11  as details WHERE details.submission_id=inspection.school_name group by details.name_of_school";

    connection.query(schoolsQuery, function (err, result) {

        let allSchools = [];

        for (let i = 0; i < result.length; i++) {
            let school = result[i].school;
            allSchools.push(school)
        }

        res.render('dashboard', {schools: allSchools});


    });

});


router.get('/enrollment-stats/:name_of_school', function (req, res, next) {

    // Get school id
    let nameOfSchool = req.params.name_of_school;


    // run query where school id
    const limit = 1;
    const aQuery = `select distinct(name_of_school) as schools, 
    p1__enrolment__boys as p1_boys, p1__enrolment__girls as p1_girls, 
    p2__enrolment__boys as p2_boys, p2__enrolment__girls as p2_girls, 
    p3__enrolment__boys as p3_boys, p3__enrolment__girls as p3_girls,
    p4__enrolment__boys as p4_boys, p4__enrolment__girls as p4_girls,
    p5__enrolment__boys as p5_boys, p5__enrolment__girls as p5_girls,
    p6__enrolment__boys as p6_boys, p6__enrolment__girls as p6_girls,
    p7__enrolment__boys as p7_boys, p7__enrolment__girls as p7_girls 
    from tbl_random where name_of_school = '${nameOfSchool}' limit ${limit}`;

    connection.query(aQuery, function fillGraph(err, result,) {
        if (err) throw err;
        let schoolsArray = [];
        let schoolBoysArray = [];
        let schoolGirlsArray = [];
        let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // School
            let school = result[i].schools;

            schoolsArray.push(school)

            // Processing boys for each school and each class
            let boysArray = [];
            for (let b = 1; b <= 7; b++) {
                let sClass = `p${b}_boys`;
                boysArray.push(result[i][sClass]);
            }
            schoolBoysArray.push(boysArray);

            // Processing girls for each school and each class
            let girlsArray = [];
            for (let g = 1; g <= 7; g++) {
                let sClass = `p${g}_girls`;
                girlsArray.push(result[i][sClass]);
            }
            schoolGirlsArray.push(girlsArray);

        }

        let school = schoolsArray[0];
        let boysPlot = JSON.stringify(schoolBoysArray[0]);
        let girlsPlot = JSON.stringify(schoolGirlsArray[0]);

        res.send({school: school, boys: boysPlot, girls: girlsPlot})

    })

});
  


module.exports = router;