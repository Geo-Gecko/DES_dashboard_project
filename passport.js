var passport = require('passport');
LocalStrategy = require('passport-local').Strategy; 
var connection = require('../config/database'); 
var bcrypt = require('bcrypt-nodejs');        

module.exports = function (passport) {
      // used to serialize the user for the session
      passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },

        function(req, username, password, done) { 
            // callback with email and password from our form
            connection.query("SELECT * FROM users WHERE email = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    // req.flash is the way to set flashdata using connect-flash
                    return done(null, false, req.flash('loginMessage', 'No user found.'));   
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                 // create the loginMessage and save it to session as flashdata
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
 
};