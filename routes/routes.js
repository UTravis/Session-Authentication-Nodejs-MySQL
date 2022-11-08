const express = require("express");
const { Register, Login, Logout } = require("../controllers/app");
const Auth = require("../middleware/Auth");

const router = express.Router();

router.get('/', (req, res) => res.redirect('/home') );

router.get('/register', (req, res) =>  res.render('register', { message : req.flash() }) )
router.post('/register', Register);

router.get('/login', (req, res) => res.render('login', { message : req.flash() }) );
router.post('/login', Login);

router.get('/home', Auth, (req, res) => {
        res.render('home', { userName : req.session.user.username })
    });

router.get('/logout', Logout)

module.exports = router;