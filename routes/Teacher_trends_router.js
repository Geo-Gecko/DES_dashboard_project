var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:name_of_school', function(req, res, next) {

    // Get school id
    let nameOfSchool = req.params.name_of_school;


    // run query where school id
    const limit = 1;
    const rQuery = `select inspection.term as inspection_date, sum(inspection.established_staffing_as_per_enrollment) as enrol, 
    sum(inspection.current_staffing_level) as staff,
    sum(inspection.staff_attendance_on_visit_day) as attend,
     details.name_of_school as school FROM  ft_form_12  as inspection,  ft_form_11  as details WHERE details.submission_id=inspection.school_name and details.name_of_school ='${nameOfSchool}' and inspection.term != 'NUL' group by inspection.term order by inspection.term asc`;


    let enrolArray = [];
    let schoolsArray = [];
    let staffArray = [];
    let attendArray = [];
    let inspectionArray =[];

    connection.query(rQuery, function fillGraph(err, result, ) {
        if (err) throw err;

        //let flag = 0;
        for (let i = 0; i < result.length; i++) {
            // School
            let school = result[i].school;

            schoolsArray.push(school)

            // Processing teacher enrolment for each school and each class
            let teacherenrol = [];
            for (let b = 1; b <= 1; b++) {
                let Tenrol = `enrol`;
                teacherenrol.push(result[i][Tenrol]);
            }
            enrolArray.push(teacherenrol);

            // Processing staffing level for each school and each class
            let teacherstaff = [];
            for (let g = 1; g <= 1; g++) {
                let Tstaff = `staff`;
                teacherstaff.push(result[i][Tstaff]);
            }
            staffArray.push(teacherstaff);

            
             // Processing number of teachers who attended on visitation day for each school and each class
             let teacherattend = [];
             for (let g = 1; g <= 1; g++) {
                 let Tattend = `attend`;
                 teacherattend.push(result[i][Tattend]);
             }
             attendArray.push(teacherattend);

                // processing inspection dates
                let inspections = [];
                for (let m = 1; m <= 1; m++) {
                    let sch_inspection = `inspection_date`;
                    inspections.push(result[i][sch_inspection]);
                }
                inspectionArray.push(inspections);

        }

        let school_name = schoolsArray[0];
        let sch_enrol = enrolArray;
        let sch_staff = staffArray;
        let sch_attend = attendArray;
        let sch_inspection = inspectionArray;
        console.log("sch_enrol",sch_enrol);
        

        res.send({ school: school_name, enrol: sch_enrol, staff: sch_staff, attend:sch_attend,  inspection:sch_inspection})
    })



});

module.exports = router;