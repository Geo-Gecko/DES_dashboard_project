var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:name_of_school', function(req, res, next) {

    let nameOfSchool = req.params.name_of_school;

    const limit = 5;

    const aQuery = `SELECT inspection.school_name as school_id, details.name_of_school as name_of_school, 
    inspection. condition_of_school_building_and_compound  as pillar1_domain1, 
    inspection.classroom_infrastructure  as pillar1_domain2, 
    inspection. sanitary_facilities  as pillar1_domain3, 
    inspection. timetabling  as pillar1_domain4, 
    inspection. teacher_deployment  as pillar1_domain5, 
    inspection. disciplinary_policy  as pillar1_domain6,
     inspection. inclusive_school_practice  as pillar1_domain7,
     inspection. gender_sensitive_school  as pillar1_domain8,
      inspection. teacher_and_pupil_attendance  as pillar2_domain1, 
      inspection. school_improvement_plan_sip  as pillar2_domain2, 
      inspection. sip_activities  as pillar2_domain3, 
      inspection. financial_management  as pillar2_domain4, 
      inspection. systematic_monitoring_and_evaluation_of_teacher_performance  as pillar2_domain5, 
      inspection. continuous_professional_development  as pillar2_domain6, 
      inspection. systematic_monitoring_of_student_performance  as pillar2_domain7, 
      inspection. lesson_planning  as pillar3_domain1, 
      inspection. lesson_delivery  as pillar3_domain2, 
       teaching_and_learning_materials  as pillar3_domain3, 
       inspection. learner_participation  as pillar3_domain4, 
       inspection. learning  as pillar3_domain5,
        inspection. teachers_rapport_with_learners  as pillar3_domain6, 
        inspection. classroom_environment  as pillar3_domain7,
         inspection. pupils_work  as pillar3_domain8, 
         inspection. school_management_committee  as pillar4_domain1,
          inspection. school_communication_with_parents_community  as pillar4_domain2, 
          inspection. teacher_communication_with_parents  as pillar4_domain3, 
          inspection. involvement_of_parents  as pillar4_domain4 
          FROM  ft_form_12  as inspection,  ft_form_11  as details WHERE details.submission_id=inspection.school_name and details.name_of_school ='${nameOfSchool}'`;



    connection.query(aQuery, function fill(err, result, ) {
        if (err) throw err;
        let schoolArray = [];
        let pillar1Array = [];
        let pillar2Array = [];
        let pillar3Array = [];
        let pillar4Array = [];



        for (let i = 0; i < result.length; i++) {
            // School
            let school = result[i].name_of_school;

            schoolArray.push(school)


            //Processing each pillers for each school
            let piller1 = [];
            for (let b = 1; b <= 8; b++) {
                let pillerCond = `pillar1_domain${b}`;
                piller1.push(result[i][pillerCond]);
            }
            pillar1Array.push(piller1);

            // // Processing pillars 2 for each school  
            let pillar2 = [];
            for (let g = 1; g <= 7; g++) {
                let pillarDomi = `pillar2_domain${g}`;
                pillar2.push(result[i][pillarDomi]);
            }
            pillar2Array.push(pillar2);


            // // Processing pillars 2 for each school  
            let pillar3 = [];
            for (let c = 1; c <= 8; c++) {
                let pillarDomi = `pillar3_domain${c}`;
                pillar3.push(result[i][pillarDomi]);
            }
            pillar3Array.push(pillar3);


            // // Processing pillars 2 for each school  
            let pillar4 = [];
            for (let m = 1; m <= 4; m++) {
                let pillarDomi = `pillar4_domain${m}`;
                pillar4.push(result[i][pillarDomi]);
            }
            pillar4Array.push(pillar4);

        }



        let school = schoolArray[0];
        let pillar1Data = pillar1Array[0];
        let pillar2Data = pillar2Array[0];
        let pillar3Data = pillar3Array[0];
        let pillar4Data = pillar4Array[0];


        res.send({ school: school, pillar1: pillar1Data, pillar2: pillar2Data, pillar3: pillar3Data, pillar4: pillar4Data });

    })

});



module.exports = router;