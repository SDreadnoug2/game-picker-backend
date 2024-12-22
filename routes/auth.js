const express = require('express');
const SteamStrategy = require("passport-steam");
const router = require('express').Router();
const passport = require('passport');

passport.use(new SteamStrategy({
  returnURL: 'https://api.pickagame.crabdance.com/auth/login',
  realm: 'https://api.pickagame.crabdance.com',
  apiKey: '11CEE5DB82AEEFD5D66119105D65286C'
},
function(identifier, profile, done) {
 const userProfile = {
  steamID: profile.id,
  name: profile.displayName,
  avatar: profile.photos[0].value,
 };
 return done(null, userProfile);
}));

router.get('/login', passport.authenticate('steam', {failureRedirect: '/login/failure'}),
  function(req, res) {
    const user = req.user;
    console.log(user);
    res.send(user);
    const redirectUrl = `http://www.pickagame.app/libraries/userlibrary?userID=${user.steamID}&username=${encodeURIComponent(user.name)}&avatar=${encodeURIComponent(user.avatar)}`;
    res.redirect(redirectUrl);
  });

module.exports = router;