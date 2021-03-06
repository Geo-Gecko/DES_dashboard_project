var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:district/:year', function(req, res, next) {

    // Get school id
    let nameOfDistrict = req.params.district;

    // Get year id
    let year = req.params.year;

    // run query where school id
    const limit = 1;
    const P1Query = `
    select distinct(district) as district, inspection.term as inspection_date, cast(avg(inspection.condition_of_school_building_and_compound) as unsigned) +
    cast(avg(inspection.classroom_infrastructure) as unsigned) +
    cast(avg(inspection.sanitary_facilities) as unsigned) + 
    cast(avg(inspection.timetabling) as unsigned)+
    cast(avg(inspection.teacher_deployment) as unsigned) +
    cast(avg(inspection.disciplinary_policy) as unsigned)+
    cast(avg(inspection.inclusive_school_practice) as unsigned)+
    cast(avg(inspection.gender_sensitive_school) as unsigned) as pilar1 ,
    cast(avg(inspection.teacher_and_pupil_attendance) as unsigned) +
    cast(avg(inspection.school_improvement_plan_sip) as unsigned) +
    cast(avg(inspection.sip_activities) as unsigned) + 
    cast(avg(inspection.financial_management) as unsigned)+
    cast(avg(inspection.systematic_monitoring_and_evaluation_of_teacher_performance) as unsigned) +
    cast(avg(inspection.continuous_professional_development) as unsigned)+
    cast(avg(inspection.systematic_monitoring_of_student_performance) as unsigned) as pilar2,
    cast(avg(inspection.lesson_planning) as unsigned) +
    cast(avg(inspection.lesson_delivery) as unsigned) +
    cast(avg(inspection.teaching_and_learning_materials) as unsigned) + 
    cast(avg(inspection.learner_participation) as unsigned)+
    cast(avg(inspection.learning) as unsigned) +
    cast(avg( inspection.teachers_rapport_with_learners) as unsigned)+
    cast(avg(inspection.classroom_environment) as unsigned)+
    cast(avg(inspection.pupils_work) as unsigned) as pilar3 ,
     cast(avg( inspection.school_management_committee) as unsigned) +
    cast(avg(inspection.school_communication_with_parents_community) as unsigned) +
    cast(avg(inspection.teacher_communication_with_parents) as unsigned) + 
    cast(avg(inspection.involvement_of_parents) as unsigned) as pilar4 FROM  ft_form_12  as inspection, ft_form_11  as details 
    WHERE details.submission_id=inspection.school_name and details.district = '${nameOfDistrict}' AND DATE_FORMAT(
        inspection.date_of_inspection,'%Y') = '${year}' and
inspection.term != 'NULL' group by inspection.term order by inspection.term asc`;


    let pillar1Array = [];
    let pillar2Array = [];
    let pillar3Array = [];
    let pillar4Array = [];
    let inspectionsArray = [];
    let districtArray =[];
    
    connection.query(P1Query, function fillGraph(err, result, ) {
        if (err) throw err;

        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // District
            let district = result[i].district;

            districtArray.push(district)

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

        

        let district = districtArray[0];
        let pillar1Score = pillar1Array;
        let pillar2Score = pillar2Array;
        let pillar3Score = pillar3Array;
        let pillar4Score = pillar4Array;
        let inspections = inspectionsArray;
        

        res.send({district: district, pillar1Score: pillar1Score, pillar2Score: pillar2Score, pillar3Score: pillar3Score, pillar4Score: pillar4Score, inspections: inspections})
    })



});

module.exports = router;