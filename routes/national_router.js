var express = require('express');
var router = express.Router();
var connection = require('../config/database');



router.get('/', function (req, res, next) {

///calculate logic

//Respond to the request using res

//call

res.render('national')

});

router.get('/create', function (req, res, next) {



});



module.exports = router;