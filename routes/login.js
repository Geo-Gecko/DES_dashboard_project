var express = require('express');
var passport = require('passport');
var router = express.Router();





router.post('/login', function (req, res, next) {

    passport.authenticate('local', { successRedirect: '/', dashboardRouter,
    failureRedirect: '/login',
    failureFlash: true })
 
res.send('login')

});

// router.get('/create', function (req, res, next) {



// });



module.exports = router;