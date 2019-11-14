var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:school', function(req, res, next) {

    // Get school id
    let nameOfSchool = req.params.school;


    // run query where school id
    const limit = 1;
    const P1Query = `select distinct(name_of_school) as school, inspection.date_of_inspection as inspection_date, inspection.condition_of_school_building_and_compound +
   inspection.classroom_infrastructure +
    inspection.sanitary_facilities + 
    inspection.timetabling+
    inspection.teacher_deployment +
    inspection.disciplinary_policy+
   inspection.inclusive_school_practice+
   inspection.gender_sensitive_school as pilar1 FROM  ft_form_12  as inspection,  ft_form_11  as details 
    WHERE details.submission_id=inspection.school_name and details.name_of_school = '${nameOfSchool}' group by inspection.date_of_inspection order by inspection.date_of_inspection asc`;

    const P2Query = `select distinct(name_of_school) as school, inspection.date_of_inspection as inspection_date, inspection.teacher_and_pupil_attendance +
    inspection.school_improvement_plan_sip +
    inspection.sip_activities + 
    inspection.financial_management+
    inspection.systematic_monitoring_and_evaluation_of_teacher_performance +
    inspection.continuous_professional_developmen+
    inspection.systematic_monitoring_of_student_performance as pilar2 FROM  ft_form_12  as inspection,  ft_form_11  as details 
    WHERE details.submission_id=inspection.school_name and details.name_of_school = '${nameOfSchool}' group by inspection.date_of_inspection order by inspection.date_of_inspection asc`;

    const P3Query = `select distinct(name_of_school) as school, inspection.date_of_inspection as inspection_date,inspection.lesson_planning +
    inspection.lesson_delivery +
    inspection.teaching_and_learning_materials + 
    inspection.learner_participation+
    inspection.learning +
    inspection.teachers_rapport_with_learners+
    inspection.classroom_environment+
    inspection.pupils_work as pilar3 FROM  ft_form_12  as inspection,  ft_form_11  as details 
    WHERE details.submission_id=inspection.school_name and details.name_of_school = '${nameOfSchool}' group by inspection.date_of_inspection order by inspection.date_of_inspection asc`;

    const P4Query = `select distinct(name_of_school) as school, inspection.date_of_inspection as inspection_date,  inspection.school_management_committee +
    inspection.school_communication_with_parents_community +
    inspection.teacher_communication_with_parents + 
   inspection.involvement_of_parents as pilar4 FROM  ft_form_12  as inspection,  ft_form_11  as details 
    WHERE details.submission_id=inspection.school_name and details.school = '${nameOfSchool}' group by inspection.date_of_inspection order by inspection.date_of_inspection asc`;


    let pillar1Array = [];
    let inspectionsArray = [];
    let schoolArray =[];
    
    connection.query(P1Query, function fillGraph(err, result, ) {
        if (err) throw err;

        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // School
            let school = result[i].school;

            schoolArray.push(school)

            // Processing Pillar1 trend for each district
            let Pillar1 = [];
            for (let b = 1; b <= 1; b++) {
                let Tpillar = `pilar1`;
                Pillar1.push(result[i][Tpillar]);
            }
            pillar1Array.push(Pillar1);

                // processing inspection dates
                let inspections = [];
                for (let m = 1; m <= 1; m++) {
                    let sch_inspection = `inspection_date`;
                    inspections.push(result[i][sch_inspection]);
                }
                inspectionsArray.push(inspections);

        }

        // console.log("staffArray",staffArray);
        // console.log("enrolArray",enrolArray);
        // console.log(" attendArray", attendArray);

        let school = schoolArray[0];
        let pillar1Score = pillar1Array;
        let inspections = inspectionsArray;
        

        res.send({school: school, pillar1Score: pillar1Score, inspections: inspections})
    })



});

module.exports = router;