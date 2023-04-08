const router = require("express").Router();
const passport = require("passport");
const isLoggedIn = require("../route-handlers");

router.get("/success", isLoggedIn, (req, res) => res.send({ "user": req.user }))
router.get("/failed", (req, res) => res.send("Failed"))

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
router.get('/google/callback', passport.authenticate('google', {successRedirect: process.env.CLIENT_URL, failureRedirect: '/failed' }))

router.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/')
})

module.exports = router