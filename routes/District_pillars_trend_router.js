var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:district', function(req, res, next) {

    // Get school id
    let nameOfDistrict = req.params.district;
    console.log('passing through here______')


    // run query where school id
    const limit = 1;
    const P1Query = `
    START TRANSACTION;
    select distinct(district) as district, inspection.date_of_inspection as inspection_date, cast(avg(inspection.condition_of_school_building_and_compound) as unsigned) +
    cast(avg(inspection.classroom_infrastructure) as unsigned) +
    cast(avg(inspection.sanitary_facilities) as unsigned) + 
    cast(avg(inspection.timetabling) as unsigned)+
    cast(avg(inspection.teacher_deployment) as unsigned) +
    cast(avg(inspection.disciplinary_policy) as unsigned)+
    cast(avg(inspection.inclusive_school_practice) as unsigned)+
    cast(avg(inspection.gender_sensitive_school) as unsigned) as pilar1 FROM  ft_form_12  as inspection,  ft_form_11  as details 
    WHERE details.submission_id=inspection.school_name and details.district = '${nameOfDistrict}' group by inspection.date_of_inspection order by inspection.date_of_inspection asc;
    
    select distinct(district) as district, inspection.date_of_inspection as inspection_date, cast(avg(inspection.teacher_and_pupil_attendance) as unsigned) +
    cast(avg(inspection.school_improvement_plan_sip) as unsigned) +
    cast(avg(inspection.sip_activities) as unsigned) + 
    cast(avg(inspection.financial_management) as unsigned)+
    cast(avg(inspection.systematic_monitoring_and_evaluation_of_teacher_performance) as unsigned) +
    cast(avg(inspection.continuous_professional_development) as unsigned)+
    cast(avg(inspection.systematic_monitoring_of_student_performance) as unsigned) as pilar2 FROM  ft_form_12  as inspection,  ft_form_11  as details 
    WHERE details.submission_id=inspection.school_name and details.district = '${nameOfDistrict}' group by inspection.date_of_inspection order by inspection.date_of_inspection asc;
    
    select distinct(district) as district, inspection.date_of_inspection as inspection_date, cast(avg(inspection.lesson_planning) as unsigned) +
    cast(avg(inspection.lesson_delivery) as unsigned) +
    cast(avg(inspection.teaching_and_learning_materials) as unsigned) + 
    cast(avg(inspection.learner_participation) as unsigned)+
    cast(avg(inspection.learning) as unsigned) +
    cast(avg( inspection.teachers_rapport_with_learners) as unsigned)+
    cast(avg(inspection.classroom_environment) as unsigned)+
    cast(avg(inspection.pupils_work) as unsigned) as pilar3 FROM  ft_form_12  as inspection,  ft_form_11  as details 
    WHERE details.submission_id=inspection.school_name and details.district = '${nameOfDistrict}' group by inspection.date_of_inspection order by inspection.date_of_inspection asc;
    
    select distinct(district) as district, inspection.date_of_inspection as inspection_date, cast(avg( inspection.school_management_committee) as unsigned) +
    cast(avg(inspection.school_communication_with_parents_community) as unsigned) +
    cast(avg(inspection.teacher_communication_with_parents) as unsigned) + 
    cast(avg(inspection.involvement_of_parents) as unsigned) as pilar4 FROM  ft_form_12  as inspection,  ft_form_11  as details 
    WHERE details.submission_id=inspection.school_name and details.district = '${nameOfDistrict}' group by inspection.date_of_inspection order by inspection.date_of_inspection asc;
    COMMIT;`;


    let pillar1Array = [];
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

        let district = districtArray[0];
        let pillar1Score = pillar1Array;
        let inspections = inspectionsArray;
        

        res.send({district: district, pillar1Score: pillar1Score, inspections: inspections})
    })



});

module.exports = router;