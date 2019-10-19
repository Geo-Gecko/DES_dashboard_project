var express = require('express');
var router = express.Router();
var connection = require('../config/database');






router.get('/:district', function(req, res, next) {


    const limit = 10;

    let nameOfDistrict = req.params.district;

    const aQuery = `select distinct(details.district) as district, 
    cast(avg(inspection.condition_of_school_building_and_compound) as unsigned)  as pilar1cond1, 
    cast(avg(inspection.classroom_infrastructure) as unsigned) as pilar1cond2,
    cast(avg(inspection.sanitary_facilities) as unsigned) as pilar1cond3, 
    cast(avg(inspection.timetabling) as unsigned) as pilar1cond4, 
    cast(avg(inspection.teacher_deployment) as unsigned) as pilar1cond5,
    cast(avg(inspection.disciplinary_policy) as unsigned)  as pilar1cond6,
    cast(avg(inspection.inclusive_school_practice) as unsigned) as pilar1cond7, 
    cast(avg(inspection.gender_sensitive_school) as unsigned) as pilar1cond8,
    cast(avg(inspection.condition_of_school_building_and_compound) as unsigned)  as pilar1cond1, 
    cast(avg(inspection.classroom_infrastructure) as unsigned) as pilar1cond2,
    cast(avg(inspection.sanitary_facilities) as unsigned) as pilar1cond3, 
    cast(avg(inspection.timetabling) as unsigned) as pilar1cond4, 
    cast(avg(inspection.teacher_deployment) as unsigned) as pilar1cond5,
    cast(avg(inspection.disciplinary_policy) as unsigned)  as pilar1cond6,
    cast(avg(inspection.inclusive_school_practice) as unsigned) as pilar1cond7, 
    cast(avg(inspection.gender_sensitive_school) as unsigned) as pilar1cond8,
     cast(avg(inspection.gender_sensitive_school) as unsigned) as pilar1cond8,
     cast(avg(inspection.teacher_and_pupil_attendance) as unsigned) as pilar2cond1,
     cast(avg(inspection.school_improvement_plan_sip) as unsigned) as pilar2cond2,
     cast(avg(inspection.sip_activities) as unsigned) as pilar2cond3,
     cast(avg(inspection.financial_management) as unsigned) as pilar2cond4,
    cast(avg(inspection.systematic_monitoring_and_evaluation_of_teacher_performance) as unsigned) as pilar2cond5,
    cast(avg(inspection.continuous_professional_development) as unsigned) as pilar2cond6,
    cast(avg(inspection.systematic_monitoring_of_student_performance) as unsigned) as pilar2cond7,
 cast(avg(inspection.lesson_planning) as unsigned) as pilar3cond1,
 cast(avg(inspection.lesson_delivery) as unsigned) as pilar3cond2,
 cast(avg(inspection.teaching_and_learning_materials) as unsigned) as pilar3cond3,
 cast(avg(inspection.learner_participation) as unsigned) as pilar3cond4,
 cast(avg(inspection.learning) as unsigned) as pilar3cond5,
 cast(avg(inspection.teachers_rapport_with_learners) as unsigned) as pilar3cond6,
 cast(avg(inspection.classroom_environment) as unsigned) as pilar3cond7,
 cast(avg(inspection.pupils_work) as unsigned) as pilar3cond8,
 cast(avg(inspection.school_management_committee) as unsigned) as pilar4cond1,
 cast(avg(inspection.school_communication_with_parents_community) as unsigned) as pilar4cond2,
 cast(avg(inspection.teacher_communication_with_parents) as unsigned) as pilar4cond3,
 cast(avg(inspection.involvement_of_parents) as unsigned) as pilar4cond4
FROM  ft_form_12  as inspection,  ft_form_11  as details 
WHERE details.submission_id=inspection.school_name and details.district = '${nameOfDistrict}' group by details.district`;

    // console.log("")
    // console.log("")
    // console.log("aQuery", aQuery)
    // console.log("")
    // console.log("")

    connection.query(aQuery, function fill(err, result, ) {
        if (err) throw err;
        let districtArray = [];
        let pillar1Array = [];
        let pillar2Array = [];
        let pillar3Array = [];
        let pillar4Array = [];
        // let attendenceGirlsArray = [];
        //let flag = 0; 
        for (let i = 0; i < result.length; i++) {
            // School
            let district = result[i].district;

            districtArray.push(district)


            //Processing each piller1 for each district
            let piller1 = [];
            for (let b = 1; b <= 8; b++) {
                let pillerCond = `pilar1cond${b}`;
                piller1.push(result[i][pillerCond]);
            }
            pillar1Array.push(piller1);


            //Processing each piller2 for each district
            let piller2 = [];
            for (let b = 1; b <= 7; b++) {
                let pillerCond = `pilar2cond${b}`;
                piller2.push(result[i][pillerCond]);
            }
            pillar2Array.push(piller2);

            //Processing each piller2 for each district
            let piller3 = [];
            for (let b = 1; b <= 8; b++) {
                let pillerCond = `pilar3cond${b}`;
                piller3.push(result[i][pillerCond]);
            }
            pillar3Array.push(piller3);

            //Processing each piller2 for each district
            let piller4 = [];
            for (let b = 1; b <= 4; b++) {
                let pillerCond = `pilar4cond${b}`;
                piller4.push(result[i][pillerCond]);
            }
            pillar4Array.push(piller4);
        }

        let district = districtArray[0];
        //console.log(districtConditionalArray)

        let districtConditionalPlot = {
            school: district,
            pillar1Array: pillar1Array,
            pillar2Array: pillar2Array,
            pillar3Array: pillar3Array,
            pillar4Array: pillar4Array
        };
        // let girlsPlot = JSON.stringify(attendenceGirlsArray[0]);
        // console.log('districtConditionalPlot', districtConditionalPlot)
        res.send(districtConditionalPlot);

    })

});



module.exports = router;