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

/* GET lats-longs. */
router.get('/allCoordinates/:year', function (req, res, next) {

    let year = req.params.year;

    const schoolsQuery = `select ft_form_12.date_of_inspection, ft_form_11.latitude as latitude, ft_form_11.longitude as longitude, ft_form_11.region as region, ft_form_11.district as district, ft_form_11.county as county, ft_form_11.sub_county as sub_county, ft_form_11.emis_number as emis_number, ft_form_11.parish_ward as parish_ward, ft_form_11.name_of_school as name, (ft_form_12.condition_of_school_building_and_compound + ft_form_12.classroom_infrastructure + ft_form_12.sanitary_facilities + ft_form_12.timetabling + ft_form_12.teacher_deployment + ft_form_12.disciplinary_policy + ft_form_12.inclusive_school_practice + ft_form_12.gender_sensitive_school + ft_form_12.teacher_and_pupil_attendance + ft_form_12.school_improvement_plan_sip + ft_form_12.sip_activities + ft_form_12.financial_management + ft_form_12.systematic_monitoring_and_evaluation_of_teacher_performance + ft_form_12.continuous_professional_development + ft_form_12.systematic_monitoring_of_student_performance + ft_form_12.lesson_planning + ft_form_12.lesson_delivery + ft_form_12.teaching_and_learning_materials + ft_form_12.learner_participation + ft_form_12.learning + ft_form_12.teachers_rapport_with_learners + ft_form_12.classroom_environment + ft_form_12.pupils_work + ft_form_12.school_management_committee + ft_form_12.school_communication_with_parents_community + ft_form_12.teacher_communication_with_parents + ft_form_12.involvement_of_parents) as Total from ft_form_11 inner join ft_form_12 on ft_form_11.emis_number=ft_form_12.school_name where DATE_FORMAT(ft_form_12.date_of_inspection,'%Y') = '${year}'`;


    let allSchools = [];

    connection.query(schoolsQuery, function (err, result) {

        result.forEach(element => {
            allSchools.push(element);
        });
   
        res.send({ "school": allSchools })

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