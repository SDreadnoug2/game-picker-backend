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

    res.cookie('userData', JSON.stringify({
      steamID: user.steamID,
      name: user.name,
      avatar: user.avatar,
    }), {
      httpOnly: false,
      secure: true,
      sameSite: 'None',
      domain: '.pickagame.app',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
    });
    const redirectUrl = `http://www.pickagame.app/libraries/userlibrary`;
    res.redirect(redirectUrl);
  });

module.exports = router;