const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/users');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) return res.status(400).json({error: err});
    if(!user){
      if(req.headers.referer.includes('signup')){
        return User.create({...req.body});
      } else {
        return res.status(400).json({error: "User not found"});
      }
    } 

    req.logIn(user, err => {
      if(err) return res.status(400).json({error: err});

      return res.status(200).json({success: true, ...user});
    });
  })(req, res, next);
});

router.get('/all', async (req, res) => {
  let users = await User.find();

  res.json(users);
})

module.exports = router;