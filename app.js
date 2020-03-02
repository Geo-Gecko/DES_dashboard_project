var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');





//Login
var loginRouter = require('./routes/login');


// Schools
var dashboardRouter = require('./routes/dashboard');
var attendence_enrolmentRouter = require('./routes/attendence_enrolment_router');
var teacherToPupilRatioRouter = require('./routes/teacherToPupilRatio');
var chartPiller = require('./routes/chartPiller_router');
var chartPillerTrendRouter = require('./routes/School_pillars_trend_router');
var classroomPupil = require('./routes/classroomPupil_router');
var trend = require('./routes/schooltrend_router');
var stancePupil = require('./routes/stancePupil_router');
var details = require('./routes/schoolDetails_router');
var attendence_entrolmant_trendRouter = require('./routes/attendance_entolment_trend_router');
var teacher_statistics_Router = require('./routes/Teacher_trends_router');
var teacherStatsRouter = require('./routes/teacher_stats_router');
var teachAccordTTRouter = require('./routes/teach_according_to_TT_router');



//Districts
var districtsRouter = require('./routes/districts');
var districtsDetailsRouter = require('./routes/District_details_router');
var districtsAttendanceRouter = require('./routes/District_attendance_router');
var districtsEnrolmentRouter = require('./routes/District_enrolment_router');
var districtsTPRRouter = require('./routes/District_TPR_router');
var districtsSPRRouter = require('./routes/District_SPR_router');
var districtsCPRRouter = require('./routes/District_CPR_router');
var districtsPillarsRouter = require('./routes/District_pillars_router');
var districtpillarsTrendRouter = require('./routes/District_pillars_trend_router');
var districtstrendRouter = require('./routes/District_trend_router');
var districtteacherStatsRouter = require('./routes/District_teacher_stats_router');
var districtteacherStatsTrendRouter = require('./routes/District_teacher_stats_trend_router');
var districtteachAccordTTRouter = require('./routes/District_teach_according_to_TT_router');

//National 
var nationalRouter = require('./routes/national_router');
var nationalDetailsRouter = require('./routes/national_details_router');
var nationalAttendanceRouter = require('./routes/national_attendance_router');
var nationalEnrolAttendTrendRouter = require('./routes/national_attendance_enrolment_trend_router');
var nationalTPRRouter = require('./routes/national_TPR_router');
var nationalSPRRouter = require('./routes/national_SPR_router');
var nationalCPRRouter = require('./routes/national_CPR_router');
var nationalPillarsRouter = require('./routes/national_Pillars_router');
var nationalPillarsTrendRouter = require('./routes/National_pillars_trend_router');
var nationalTeacherStatsRouter = require('./routes/National_teacher_stats_router');
var nationalTeacherStatsTrendRouter = require('./routes/National_teacher_stats_trend_router');
var nationalteachAccordTTRouter = require('./routes/National_teacher_stats_trend_router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));
//Express session
app.use(session({ cookie: { maxAge: 900000 }, 
    secret: process.env.SECRET_KEY,
    resave: false, 
    saveUninitialized: false}));
//Express Passport JS
app.use(passport.initialize());
app.use(passport.session());

//login
app.use('/', loginRouter);

app.all('*', function(req,res,next){
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')  
  });

//Schools
app.use('/dashboard', dashboardRouter);
app.use('/chart_attendance', attendence_enrolmentRouter);
app.use('/teacher-to-pupil-ratio', teacherToPupilRatioRouter);
app.use('/chartPiller-stats', chartPiller);
app.use('/chartPiller-Trend-stats', chartPillerTrendRouter);
app.use('/classroomPupil-stats', classroomPupil);
app.use('/schooltrend-stats', trend);
app.use('/schooldetails-stats', details);
app.use('/stancePupil-stats', stancePupil);
app.use('/teacher-stats', teacherStatsRouter);
app.use('/attend-enrol-trend', attendence_entrolmant_trendRouter);
app.use('/teacher-trend-stats', teacher_statistics_Router)
app.use('/teach-Accord-TT-stats', teachAccordTTRouter)



//Districts
app.use('/districts', districtsRouter);
app.use('/districtdetails-stats', districtsDetailsRouter);
app.use('/districtattendance-stats', districtsAttendanceRouter);
app.use('/districtenrolment-stats', districtsEnrolmentRouter);
app.use('/districtTPR-stats', districtsTPRRouter);
app.use('/districtSPR-stats', districtsSPRRouter);
app.use('/districtCPR-stats', districtsCPRRouter);
app.use('/districtpillars-stats', districtsPillarsRouter);
app.use('/districtpillar-trend-stats', districtpillarsTrendRouter);
app.use('/districttrend-stats', districtstrendRouter);
app.use('/districtteacher-stats',districtteacherStatsRouter);
app.use('/districtrteacher_stats-Trend', districtteacherStatsTrendRouter);
app.use('/districtteachAccordTT', districtteachAccordTTRouter);


//National
app.use('/nationals', nationalRouter);
app.use('/nationalDetails-stats', nationalDetailsRouter);
app.use('/nationalAttendance-stats', nationalAttendanceRouter);
app.use('/nationalEnrolAttend-Trend-stats', nationalEnrolAttendTrendRouter);
app.use('/nationalTPR-stats', nationalTPRRouter);
app.use('/nationalSPR-stats', nationalSPRRouter);
app.use('/nationalCPR-stats', nationalCPRRouter);
app.use('/nationalPillars-stats', nationalPillarsRouter);
app.use('/nationalPillars-Trends-stats', nationalPillarsTrendRouter);
app.use('/nationalTeacher-stats',nationalTeacherStatsRouter);
app.use('/nationalTeacher-Trend-stats',nationalTeacherStatsTrendRouter);
app.use('/nationalteachAccordTT', nationalteachAccordTTRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;