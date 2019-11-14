var express = require('express');
var router = express.Router();
var connection = require('../config/database');






router.get('/:region', function(req, res, next) {


    const limit = 10;

    let nameOfRegion = req.params.region;

    const aQuery = `select details.region as region,
    count(CASE WHEN inspection.condition_of_school_building_and_compound=1 THEN 1 END ) as pillar1D1S1,
    count(CASE WHEN inspection.condition_of_school_building_and_compound=2 THEN 1 END) as pillar1D1S2,
    count(CASE WHEN inspection.condition_of_school_building_and_compound=3 THEN 1 END) as pillar1D1S3,
    count(CASE WHEN inspection.condition_of_school_building_and_compound=4 THEN 1 END) as pillar1D1S4,
    count(CASE WHEN inspection.classroom_infrastructure=1 THEN 1 END) as pillar1D2S1,
    count(CASE WHEN inspection.classroom_infrastructure=2 THEN 1 END) as pillar1D2S2,
    count(CASE WHEN inspection.classroom_infrastructure=3 THEN 1 END) as pillar1D2S3,
    count(CASE WHEN inspection.classroom_infrastructure=4 THEN 1 END) as pillar1D2S4,
    count(CASE WHEN inspection.sanitary_facilities=1 THEN 1 END) as pillar1D3S1,
    count(CASE WHEN inspection.sanitary_facilities=2 THEN 1 END) as pillar1D3S2,
    count(CASE WHEN inspection.sanitary_facilities=3 THEN 1 END) as pillar1D3S3,
    count(CASE WHEN inspection.sanitary_facilities=4 THEN 1 END) as pillar1D3S4,
    count(CASE WHEN inspection.timetabling=1 THEN 1 END) as pillar1D4S1,
    count(CASE WHEN inspection.timetabling=2 THEN 1 END) as pillar1D4S2,
    count(CASE WHEN inspection.timetabling=3 THEN 1 END) as pillar1D4S3,
    count(CASE WHEN inspection.timetabling=4 THEN 1 END) as pillar1D4S4,
    count(CASE WHEN inspection.teacher_deployment=1 THEN 1 END) as pillar1D5S1,
    count(CASE WHEN inspection.teacher_deployment=2 THEN 1 END) as pillar1D5S2,
    count(CASE WHEN inspection.teacher_deployment=3 THEN 1 END) as pillar1D5S3,
    count(CASE WHEN inspection.teacher_deployment=4 THEN 1 END) as pillar1D5S4,
    count(CASE WHEN inspection.disciplinary_policy=1 THEN 1 END) as pillar1D6S1,
    count(CASE WHEN inspection.disciplinary_policy=2 THEN 1 END) as pillar1D6S2,
    count(CASE WHEN inspection.disciplinary_policy=3 THEN 1 END) as pillar1D6S3,
    count(CASE WHEN inspection.disciplinary_policy=4 THEN 1 END) as pillar1D6S4,
    count(CASE WHEN inspection.inclusive_school_practice=1 THEN 1 END) as pillar1D7S1,
    count(CASE WHEN inspection.inclusive_school_practice=2 THEN 1 END) as pillar1D7S2,
    count(CASE WHEN inspection.inclusive_school_practice=3 THEN 1 END) as pillar1D7S3,
    count(CASE WHEN inspection.inclusive_school_practice=4 THEN 1 END) as pillar1D7S4,
    count(CASE WHEN inspection.gender_sensitive_school=1 THEN 1 END) as pillar1D8S1,
    count(CASE WHEN inspection.gender_sensitive_school=2 THEN 1 END) as pillar1D8S2,
    count(CASE WHEN inspection.gender_sensitive_school=3 THEN 1 END) as pillar1D8S3,
    count(CASE WHEN inspection.gender_sensitive_school=4 THEN 1 END) as pillar1D8S4,
    count(CASE WHEN inspection.teacher_and_pupil_attendance=1 THEN 1 END) as pillar2D1S1,
    count(CASE WHEN inspection.teacher_and_pupil_attendance=2 THEN 1 END) as pillar2D1S2,
    count(CASE WHEN inspection.teacher_and_pupil_attendance=3 THEN 1 END) as pillar2D1S3,
    count(CASE WHEN inspection.teacher_and_pupil_attendance=4 THEN 1 END) as pillar2D1S4,
    count(CASE WHEN inspection.school_improvement_plan_sip=1 THEN 1 END) as pillar2D2S1,
    count(CASE WHEN inspection.school_improvement_plan_sip=2 THEN 1 END) as pillar2D2S2,
    count(CASE WHEN inspection.school_improvement_plan_sip=3 THEN 1 END) as pillar2D2S3,
    count(CASE WHEN inspection.school_improvement_plan_sip=4 THEN 1 END) as pillar2D2S4,
    count(CASE WHEN inspection.sip_activities=1 THEN 1 END) as pillar2D3S1,
    count(CASE WHEN inspection.sip_activities=2 THEN 1 END) as pillar2D3S2,
    count(CASE WHEN inspection.sip_activities=3 THEN 1 END) as pillar2D3S3,
    count(CASE WHEN inspection.sip_activities=4 THEN 1 END) as pillar2D3S4,
    count(CASE WHEN inspection.financial_management=1 THEN 1 END) as pillar2D3S1,
    count(CASE WHEN inspection.financial_management=2 THEN 1 END) as pillar2D4S2,
    count(CASE WHEN inspection.financial_management=3 THEN 1 END) as pillar2D4S3,
    count(CASE WHEN inspection.financial_management=4 THEN 1 END) as pillar2D4S4,
    count(CASE WHEN inspection.systematic_monitoring_and_evaluation_of_teacher_performance=1 THEN 1 END) as pillar2D5S1,
    count(CASE WHEN inspection.systematic_monitoring_and_evaluation_of_teacher_performance=2 THEN 1 END) as pillar2D5S2,
    count(CASE WHEN inspection.systematic_monitoring_and_evaluation_of_teacher_performance=3 THEN 1 END) as pillar2D5S3,
    count(CASE WHEN inspection.systematic_monitoring_and_evaluation_of_teacher_performance=4 THEN 1 END) as pillar2D5S4,
    count(CASE WHEN inspection.continuous_professional_development=1 THEN 1 END) as pillar2D6S1,
    count(CASE WHEN inspection.continuous_professional_development=2 THEN 1 END) as pillar2D6S2,
    count(CASE WHEN inspection.continuous_professional_development=3 THEN 1 END) as pillar2D6S3,
    count(CASE WHEN inspection.continuous_professional_development=4 THEN 1 END) as pillar2D6S4,
    count(CASE WHEN inspection.systematic_monitoring_of_student_performance=1 THEN 1 END) as pillar2D7S1,
    count(CASE WHEN inspection.systematic_monitoring_of_student_performance=2 THEN 1 END) as pillar2D7S2,
    count(CASE WHEN inspection.systematic_monitoring_of_student_performance=3 THEN 1 END) as pillar2D7S3,
    count(CASE WHEN inspection.systematic_monitoring_of_student_performance=4 THEN 1 END) as pillar2D7S4,
    count(CASE WHEN inspection.lesson_planning=1 THEN 1 END) as pillar3D1S1,
    count(CASE WHEN inspection.lesson_planning=2 THEN 1 END) as pillar3D1S2,
    count(CASE WHEN inspection.lesson_planning=3 THEN 1 END) as pillar3D1S3,
    count(CASE WHEN inspection.lesson_planning=4 THEN 1 END) as pillar3D1S4,
    count(CASE WHEN inspection.lesson_delivery=1 THEN 1 END) as pillar3D2S1,
    count(CASE WHEN inspection.lesson_delivery=2 THEN 1 END) as pillar3D2S2,
    count(CASE WHEN inspection.lesson_delivery=3 THEN 1 END) as pillar3D2S3,
    count(CASE WHEN inspection.lesson_delivery=4 THEN 1 END) as pillar3D2S4,
    count(CASE WHEN inspection.teaching_and_learning_materials=1 THEN 1 END) as pillar3D3S1,
    count(CASE WHEN inspection.teaching_and_learning_materials=2 THEN 1 END) as pillar3D3S2,
    count(CASE WHEN inspection.teaching_and_learning_materials=3 THEN 1 END) as pillar3D3S3,
    count(CASE WHEN inspection.teaching_and_learning_materials=4 THEN 1 END) as pillar3D3S4,
    count(CASE WHEN inspection.learner_participation=1 THEN 1 END) as pillar3D4S1,
    count(CASE WHEN inspection.learner_participation=2 THEN 1 END) as pillar3D4S2,
    count(CASE WHEN inspection.learner_participation=3 THEN 1 END) as pillar3D4S3,
    count(CASE WHEN inspection.learner_participation=4 THEN 1 END) as pillar3D4S4,
    count(CASE WHEN inspection.learning=1 THEN 1 END) as pillar3D5S1,
    count(CASE WHEN inspection.learning=2 THEN 1 END) as pillar3D5S2,
    count(CASE WHEN inspection.learning=3 THEN 1 END) as pillar3D5S3,
    count(CASE WHEN inspection.learning=4 THEN 1 END) as pillar3D5S4,
    count(CASE WHEN inspection.teachers_rapport_with_learners=1 THEN 1 END) as pillar3D6S1,
    count(CASE WHEN inspection.teachers_rapport_with_learners=2 THEN 1 END) as pillar3D6S2,
    count(CASE WHEN inspection.teachers_rapport_with_learners=3 THEN 1 END) as pillar3D6S3,
    count(CASE WHEN inspection.teachers_rapport_with_learners=4 THEN 1 END) as pillar3D6S4,
    count(CASE WHEN inspection.classroom_environment=1 THEN 1 END) as pillar3D7S1,
    count(CASE WHEN inspection.classroom_environment=2 THEN 1 END) as pillar3D7S2,
    count(CASE WHEN inspection.classroom_environment=3 THEN 1 END) as pillar3D7S3,
    count(CASE WHEN inspection.classroom_environment=4 THEN 1 END) as pillar3D7S4,
    count(CASE WHEN inspection.pupils_work=1 THEN 1 END) as pillar3D8S1,
    count(CASE WHEN inspection.pupils_work=2 THEN 1 END) as pillar3D8S2,
    count(CASE WHEN inspection.pupils_work=3 THEN 1 END) as pillar3D8S3,
    count(CASE WHEN inspection.pupils_work=4 THEN 1 END) as pillar3D8S4,
    count(CASE WHEN inspection.school_management_committee=1 THEN 1 END) as pillar4D1S1,
    count(CASE WHEN inspection.school_management_committee=2 THEN 1 END) as pillar4D1S2,
    count(CASE WHEN inspection.school_management_committee=3 THEN 1 END) as pillar4D1S3,
    count(CASE WHEN inspection.school_management_committee=4 THEN 1 END) as pillar4D1S4,
    count(CASE WHEN inspection.school_communication_with_parents_community=1 THEN 1 END) as pillar4D2S1,
    count(CASE WHEN inspection.school_communication_with_parents_community=2 THEN 1 END) as pillar4D2S2,
    count(CASE WHEN inspection.school_communication_with_parents_community=3 THEN 1 END) as pillar4D2S3,
    count(CASE WHEN inspection.school_communication_with_parents_community=4 THEN 1 END) as pillar4D2S4,
    count(CASE WHEN inspection.teacher_communication_with_parents=1 THEN 1 END) as pillar4D3S1,
    count(CASE WHEN inspection.teacher_communication_with_parents=2 THEN 1 END) as pillar4D3S2,
    count(CASE WHEN inspection.teacher_communication_with_parents=3 THEN 1 END) as pillar4D3S3,
    count(CASE WHEN inspection.teacher_communication_with_parents=4 THEN 1 END) as pillar4D3S4,
    count(CASE WHEN inspection.involvement_of_parents=1 THEN 1 END) as pillar4D4S1,
    count(CASE WHEN inspection.involvement_of_parents=2 THEN 1 END) as pillar4D4S2,
    count(CASE WHEN inspection.involvement_of_parents=3 THEN 1 END) as pillar4D4S3,
    count(CASE WHEN inspection.involvement_of_parents=4 THEN 1 END) as pillar4D4S4
        FROM  ft_form_12  as inspection,  ft_form_11  as details 
        WHERE details.submission_id=inspection.school_name and details.region = '${nameOfRegion}' group by details.region`;

    // console.log("")
    // console.log("")
    // console.log("aQuery", aQuery)
    // console.log("")
    // console.log("")

    connection.query(aQuery, function fill(err, result, ) {
        if (err) throw err;
        let regionArray = [];
        let pillar1D1Array = [];
        let pillar1D2Array = [];
        let pillar1D3Array = [];
        let pillar1D4Array = [];
        let pillar1D5Array = [];
        let pillar1D6Array = [];
        let pillar1D7Array = [];
        let pillar1D8Array = [];
        let pillar2D1Array = [];
        let pillar2D2Array = [];
        let pillar2D3Array = [];
        let pillar2D4Array = [];
        let pillar2D5Array = [];
        let pillar2D6Array = [];
        let pillar2D7Array = [];
        let pillar3D1Array = [];
        let pillar3D2Array = [];
        let pillar3D3Array = [];
        let pillar3D4Array = [];
        let pillar3D5Array = [];
        let pillar3D6Array = [];
        let pillar3D7Array = [];
        let pillar3D8Array = [];
        let pillar4D1Array = [];
        let pillar4D2Array = [];
        let pillar4D3Array = [];
        let pillar4D4Array = [];
        // let attendenceGirlsArray = [];
        //let flag = 0; 
        for (let i = 0; i < result.length; i++) {
            // School
            let region = result[i].region;

            regionArray.push(region)


            //Processing each piller1domain1 for each district
            let piller1d1 = [];
            for (let b = 1; b <= 4; b++) {
                let pillerCond = `pillar1D1S${b}`;
                piller1d1.push(result[i][pillerCond]);
            }
            pillar1D1Array.push(piller1d1);

            //Processing each piller1domain2 for each district
            let piller1d2 = [];
            for (let b = 1; b <= 4; b++) {
                let pillerCond = `pillar1D2S${b}`;
                piller1d2.push(result[i][pillerCond]);
            }
            pillar1D2Array.push(piller1d2);

             //Processing each piller1domain3 for each district
             let piller1d3 = [];
             for (let b = 1; b <= 4; b++) {
                 let pillerCond = `pillar1D3S${b}`;
                 piller1d3.push(result[i][pillerCond]);
             }
             pillar1D3Array.push(piller1d3);

              //Processing each piller1domain4 for each district
              let piller1d4 = [];
              for (let b = 1; b <= 4; b++) {
                  let pillerCond = `pillar1D4S${b}`;
                  piller1d4.push(result[i][pillerCond]);
              }
              pillar1D4Array.push(piller1d4);

               //Processing each piller1domain5 for each district
             let piller1d5 = [];
             for (let b = 1; b <= 4; b++) {
                 let pillerCond = `pillar1D5S${b}`;
                 piller1d5.push(result[i][pillerCond]);
             }
             pillar1D5Array.push(piller1d5);

              //Processing each piller1domain6 for each district
              let piller1d6 = [];
              for (let b = 1; b <= 4; b++) {
                  let pillerCond = `pillar1D6S${b}`;
                  piller1d6.push(result[i][pillerCond]);
              }
              pillar1D6Array.push(piller1d6);

               //Processing each piller1domain7 for each district
             let piller1d7 = [];
             for (let b = 1; b <= 4; b++) {
                 let pillerCond = `pillar1D7S${b}`;
                 piller1d7.push(result[i][pillerCond]);
             }
             pillar1D7Array.push(piller1d7);

              //Processing each piller1domain3 for each district
              let piller1d8 = [];
              for (let b = 1; b <= 4; b++) {
                  let pillerCond = `pillar1D8S${b}`;
                  piller1d8.push(result[i][pillerCond]);
              }
              pillar1D8Array.push(piller1d8);


            //Processing each piller2domain1 for each district
            let piller2d1 = [];
            for (let b = 1; b <= 4; b++) {
                let pillerCond = `pillar2D1S${b}`;
                piller2d1.push(result[i][pillerCond]);
            }
            pillar2D1Array.push(piller2d1);

             //Processing each piller2domain2 for each district
             let piller2d2 = [];
             for (let b = 1; b <= 4; b++) {
                 let pillerCond = `pillar2D2S${b}`;
                 piller2d2.push(result[i][pillerCond]);
             }
             pillar2D2Array.push(piller2d2);

              //Processing each piller2domain3 for each district
            let piller2d3 = [];
            for (let b = 1; b <= 4; b++) {
                let pillerCond = `pillar2D3S${b}`;
                piller2d3.push(result[i][pillerCond]);
            }
            pillar2D3Array.push(piller2d3);

             //Processing each piller2domain4 for each district
             let piller2d4 = [];
             for (let b = 1; b <= 4; b++) {
                 let pillerCond = `pillar2D4S${b}`;
                 piller2d4.push(result[i][pillerCond]);
             }
             pillar2D4Array.push(piller2d4);

              //Processing each piller2domain5 for each district
            let piller2d5 = [];
            for (let b = 1; b <= 4; b++) {
                let pillerCond = `pillar2D5S${b}`;
                piller2d5.push(result[i][pillerCond]);
            }
            pillar2D5Array.push(piller2d5);

             //Processing each piller2domain6 for each district
             let piller2d6 = [];
             for (let b = 1; b <= 4; b++) {
                 let pillerCond = `pillar2D6S${b}`;
                 piller2d6.push(result[i][pillerCond]);
             }
             pillar2D6Array.push(piller2d6);

              //Processing each piller2domain7 for each district
            let piller2d7 = [];
            for (let b = 1; b <= 4; b++) {
                let pillerCond = `pillar2D7S${b}`;
                piller2d7.push(result[i][pillerCond]);
            }
            pillar2D7Array.push(piller2d7);

            //Processing each piller3domain1 for each district
            let piller3d1 = [];
            for (let b = 1; b <= 4; b++) {
                let pillerCond = `pillar3D1S${b}`;
                piller3d1.push(result[i][pillerCond]);
            }
            pillar3D1Array.push(piller3d1);

             //Processing each piller3domain2 for each district
             let piller3d2 = [];
             for (let b = 1; b <= 4; b++) {
                 let pillerCond = `pillar3D2S${b}`;
                 piller3d2.push(result[i][pillerCond]);
             }
             pillar3D2Array.push(piller3d2);

              //Processing each piller3domain3 for each district
            let piller3d3 = [];
            for (let b = 1; b <= 4; b++) {
                let pillerCond = `pillar3D3S${b}`;
                piller3d3.push(result[i][pillerCond]);
            }
            pillar3D3Array.push(piller3d3);

             //Processing each piller3domain4 for each district
             let piller3d4 = [];
             for (let b = 1; b <= 4; b++) {
                 let pillerCond = `pillar3D4S${b}`;
                 piller3d4.push(result[i][pillerCond]);
             }
             pillar3D4Array.push(piller3d4);

              //Processing each piller3domain5 for each district
            let piller3d5 = [];
            for (let b = 1; b <= 4; b++) {
                let pillerCond = `pillar3D5S${b}`;
                piller3d5.push(result[i][pillerCond]);
            }
            pillar3D5Array.push(piller3d5);

             //Processing each piller3domain6 for each district
             let piller3d6 = [];
             for (let b = 1; b <= 4; b++) {
                 let pillerCond = `pillar3D6S${b}`;
                 piller3d6.push(result[i][pillerCond]);
             }
             pillar3D6Array.push(piller3d6);

              //Processing each piller3domain7 for each district
            let piller3d7 = [];
            for (let b = 1; b <= 4; b++) {
                let pillerCond = `pillar3D7S${b}`;
                piller3d7.push(result[i][pillerCond]);
            }
            pillar3D7Array.push(piller3d7);

             //Processing each piller3domain8 for each district
             let piller3d8 = [];
             for (let b = 1; b <= 4; b++) {
                 let pillerCond = `pillar3D8S${b}`;
                 piller3d8.push(result[i][pillerCond]);
             }
             pillar3D8Array.push(piller3d8);


            //Processing each piller4domain1 for each district
            let piller4d1 = [];
            for (let b = 1; b <= 4; b++) {
                let pillerCond = `pillar4D1S${b}`;
                piller4d1.push(result[i][pillerCond]);
            }
            pillar4D1Array.push(piller4d1);

             //Processing each piller4domain2 for each district
             let piller4d2 = [];
             for (let b = 1; b <= 4; b++) {
                 let pillerCond = `pillar4D2S${b}`;
                 piller4d2.push(result[i][pillerCond]);
             }
             pillar4D2Array.push(piller4d2);

              //Processing each piller4domain3 for each district
            let piller4d3 = [];
            for (let b = 1; b <= 4; b++) {
                let pillerCond = `pillar4D3S${b}`;
                piller4d3.push(result[i][pillerCond]);
            }
            pillar4D3Array.push(piller4d3);

             //Processing each piller4domain1 for each district
             let piller4d4 = [];
             for (let b = 1; b <= 4; b++) {
                 let pillerCond = `pillar4D4S${b}`;
                 piller4d4.push(result[i][pillerCond]);
             }
             pillar4D4Array.push(piller4d4);
        }

        let region = regionArray[0];
        //console.log(districtConditionalArray)

        let regionConditionalPlot = {
            region: region,
            pillar1D1Array: pillar1D1Array,
            pillar1D2Array: pillar1D2Array,
            pillar1D3Array: pillar1D3Array,
            pillar1D4Array: pillar1D4Array,
            pillar1D5Array: pillar1D5Array,
            pillar1D6Array: pillar1D6Array,
            pillar1D7Array: pillar1D7Array,
            pillar1D8Array: pillar1D8Array,
            pillar2D1Array: pillar2D1Array,
            pillar2D2Array: pillar2D2Array,
            pillar2D3Array: pillar2D3Array,
            pillar2D4Array: pillar2D4Array,
            pillar2D5Array: pillar2D5Array,
            pillar2D6Array: pillar2D6Array,
            pillar2D7Array: pillar2D7Array,
            pillar3D1Array:pillar3D1Array,
            pillar3D2Array:pillar3D2Array,
            pillar3D3Array:pillar3D3Array,
            pillar3D4Array:pillar3D4Array,
            pillar3D5Array:pillar3D5Array,
            pillar3D6Array:pillar3D6Array,
            pillar3D7Array:pillar3D7Array,
            pillar3D8Array:pillar3D8Array,
            pillar4D1Array:pillar4D1Array,
            pillar4D2Array:pillar4D2Array,
            pillar4D3Array:pillar4D3Array,
            pillar4D4Array:pillar4D4Array
        };
        // let girlsPlot = JSON.stringify(attendenceGirlsArray[0]);
        console.log('regionConditionalPlot', regionConditionalPlot)
        res.send(regionConditionalPlot);

    })

});



module.exports = router;