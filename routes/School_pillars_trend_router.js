var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:school', function(req, res, next) {

    // Get school id
    let nameOfSchool = req.params.school;


    // run query where school id
    const limit = 1;
    const P1Query = `select distinct(name_of_school) as school, inspection.term as inspection_date, inspection.condition_of_school_building_and_compound +
   inspection.classroom_infrastructure +
    inspection.sanitary_facilities + 
    inspection.timetabling+
    inspection.teacher_deployment +
    inspection.disciplinary_policy+
   inspection.inclusive_school_practice+
   inspection.gender_sensitive_school as pilar1, inspection.teacher_and_pupil_attendance +
    inspection.school_improvement_plan_sip +
    inspection.sip_activities + 
    inspection.financial_management+
    inspection.systematic_monitoring_and_evaluation_of_teacher_performance +
    inspection.continuous_professional_development+
    inspection.systematic_monitoring_of_student_performance as pilar2 ,inspection.lesson_planning +
    inspection.lesson_delivery +
    inspection.teaching_and_learning_materials + 
    inspection.learner_participation+
    inspection.learning +
    inspection.teachers_rapport_with_learners+
    inspection.classroom_environment+
    inspection.pupils_work as pilar3 ,  inspection.school_management_committee +
    inspection.school_communication_with_parents_community +
    inspection.teacher_communication_with_parents + 
   inspection.involvement_of_parents as pilar4 FROM  ft_form_12  as inspection,  ft_form_11  as details 
    WHERE details.submission_id=inspection.school_name and details.name_of_school = '${nameOfSchool}'
    and inspection.term != 'NULL' group by inspection.term order by inspection.term asc`;


    let pillar1Array = [];
    let pillar2Array = [];
    let pillar3Array = [];
    let pillar4Array = [];
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

             // Processing Pillar2 trend for each district
             let Pillar2 = [];
             for (let b = 1; b <= 1; b++) {
                 let Tpillar2 = `pilar2`;
                 Pillar2.push(result[i][Tpillar2]);
             }
             pillar2Array.push(Pillar2);
 
              // Processing Pillar3 trend for each district
              let Pillar3 = [];
              for (let b = 1; b <= 1; b++) {
                  let Tpillar3 = `pilar3`;
                  Pillar3.push(result[i][Tpillar3]);
              }
              pillar3Array.push(Pillar3);
 
               // Processing Pillar4 trend for each district
             let Pillar4 = [];
             for (let b = 1; b <= 1; b++) {
                 let Tpillar4 = `pilar4`;
                 Pillar4.push(result[i][Tpillar4]);
             }
             pillar4Array.push(Pillar4);


                // processing inspection dates
                let inspections = [];
                for (let m = 1; m <= 1; m++) {
                    let sch_inspection = `inspection_date`;
                    inspections.push(result[i][sch_inspection]);
                }
                inspectionsArray.push(inspections);

        }


        let school = schoolArray[0];
        let pillar1Score = pillar1Array;
        let pillar2Score = pillar2Array;
        let pillar3Score = pillar3Array;
        let pillar4Score = pillar4Array;
        let inspections = inspectionsArray;
        

        res.send({school: school, pillar1Score: pillar1Score,  pillar1Score: pillar1Score, pillar2Score: pillar2Score, pillar3Score: pillar3Score, pillar4Score: pillar4Score, inspections: inspections})
    })



});

module.exports = router;