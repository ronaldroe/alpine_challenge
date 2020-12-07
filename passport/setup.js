const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy({usernameField: 'email', passReqToCallback: true}, (req, email, password, done) => {
    User.findOne({email: email})
    .then(user => {

      if(!user){
        const newUser = new User({email, password, ...req.body});

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;

            newUser.password = hash;
            newUser.save().then(user => done(null, user))
            .catch(err => done(null, false, {message: err}));
          });
        });
      } else {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if(err) throw err;

          if(isMatch){
            return done(null, user);
          }
          
          return done(null, false, {message: 'Incorrect password'});
        });
      }

    })
    .catch(err => done(null, false, {message: err}));
  })
);

module.exports = passport;