var express = require('express');
var router = express.Router();
var connection = require('../config/database');






router.get('/:district', function(req, res, next) {


    const limit = 10;

    let nameOfDistrict = req.params.district;

    const aQuery = `select distinct(details.district) as district,
 inspection.date_of_inspection as inspection_date,
    sum(inspection.attendance_of_p1_boys_on_visitation_day)+
    sum(inspection.attendance_of_p1_girls_on_visitation_day)+
    sum(inspection.attendance_of_p2_boys_on_visitation_day) +
    sum(inspection.attendance_of_p2_girls_on_visitation_day)+
    sum(inspection.attendance_of_p3_boys_on_visitation_day) +
    sum(inspection.attendance_of_p3_girls_on_visitation_day) +
    sum(inspection.attendance_of_p4_boys_on_visitation_day) +
    sum(inspection.attendance_of_p4_girls_on_visitation_day)+
    sum(inspection.attendance_of_p5_boys_on_visitation_day) +
    sum(inspection.attendance_of_p5_girls_on_visitation_day) +
    sum(inspection.attendance_of_p6_boys_on_visitation_day) +
    sum(inspection.attendance_of_p6_girls_on_visitation_day) + 
    sum(inspection.attendance_of_p7_boys_on_visitation_day) +
    sum(inspection.attendance_of_p7_girls_on_visitation_day) as attendance,
    sum(inspection.number_of_boys_enrolled_in_p1)+
    sum(inspection.number_of_girls_enrolled_in_p1)+
    sum(inspection.number_of_boys_enrolled_in_p2)+
    sum(inspection.number_of_girls_enrolled_in_p2)+
    sum(inspection.number_of_boys_enrolled_in_p3)+
    sum(inspection.number_of_girls_enrolled_in_p3)+
    sum(inspection.number_of_boys_enrolled_in_p4)+
    sum(inspection.number_of_girls_enrolled_in_p4)+
    sum(inspection.number_of_boys_enrolled_in_p5)+
    sum(inspection.number_of_girls_enrolled_in_p5)+
    sum(inspection.number_of_boys_enrolled_in_p6)+
    sum(inspection.number_of_girls_enrolled_in_p6)+
    sum(inspection.number_of_boys_enrolled_in_p7) +
    sum(inspection.number_of_girls_enrolled_in_p7) as enrollment
FROM  ft_form_12  as inspection,  ft_form_11  as details 
WHERE details.submission_id=inspection.school_name and details.district='${nameOfDistrict}'
 group by details.district, inspection.date_of_inspection`;

    // console.log("")
    // console.log("")
    // console.log("aQuery", aQuery)
    // console.log("")
    // console.log("")

    connection.query(aQuery, function fill(err, result, ) {
        if (err) throw err;

        console.log('result', result)

        res.send('hi')
    })

});



module.exports = router;