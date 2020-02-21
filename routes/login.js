var express = require("express");
var passport = require("passport");
LocalStrategy = require('passport-local').Strategy; 
var connection = require('../config/database');
var md5 = require("locutus/php/strings/md5");
var router = express.Router();






router.get("/", function(req, res, next) {
  res.render("login");
});



// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.account_id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  connection.query(`SELECT * FROM ft_accounts WHERE account_id = '${id}';`, function(err, user) {

    if (err) {
      console.log(err);
    }
    return done(err, user[0]);
  });

});

passport.use(
    new LocalStrategy(
    function( username, password, done) {

      connection.query(`SELECT * FROM ft_accounts WHERE email = '${username}';`, function(err, user) {
        // console.log(user[0].password);
        if (err) {
          console.log(err);
        }
        // console.log(hashedPassword, md5(md5(password)))

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        hashedPassword = user[0].password
        if (hashedPassword != md5(md5(password))) {

          return done(null, false);


        }

        return done(null, user[0]);
      });
  
    }
    

    )
  
);

router.post(
    "/login",
    passport.authenticate(
      "local",
  
      {
        successRedirect: "/dashboard",
        failureRedirect: "/",
        failureFlash: true,
        session: false
      }
    )
  );

module.exports = router;
