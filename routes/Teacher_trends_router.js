var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/:name_of_school', function(req, res, next) {

    // Get school id
    let nameOfSchool = req.params.name_of_school;


    // run query where school id
    const limit = 1;
    const rQuery = `select inspection.date_of_inspection as inspection_date, inspection.established_staffing_as_per_enrollment as enrol, inspection.current_staffing_level as staff,
    inspection.staff_attendance_on_visit_day as attend,
     inspection.no_of_teachers_teaching_according_to_timetable as timetable, 
     details.name_of_school as school FROM  ft_form_12  as inspection,  ft_form_11  as details WHERE details.submission_id=inspection.school_name and  details.name_of_school ='${nameOfSchool}'`;


    let enrolArray = [];
    let schoolsArray = [];
    let staffArray = [];
    let attendArray = [];
    let timetableArray = [];
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

             // Processing number of teachers teaching according to the timetable for each school and each class
             let teachertimetable = [];
             for (let g = 1; g <= 1; g++) {
                 let Ttime = `timetable`;
                 teachertimetable.push(result[i][Ttime]);
             }
             timetableArray.push(teacherstaff);

        }

        // console.log("staffArray",staffArray);
        // console.log("enrolArray",enrolArray);
        // console.log(" attendArray", attendArray);

        let school = schoolsArray[0];
        let enrol = enrolArray[0];
        let staff = staffArray[0];
        let attend = attendArray[0];
        let  timetable =  timetableArray[0];

        res.send({ school: school, enrol: enrol, staff: staff, attend:attend, timetable:timetable  })

    })



});

module.exports = router;