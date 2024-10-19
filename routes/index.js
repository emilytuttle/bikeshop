const router = require('express').Router();
const dataDisplay = require('../controllers/');
const passport = require('passport');

router.use('/', require('./swagger'))

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")
})

router.get('/', dataDisplay.dataDisplay);
router.use('/users', require('./users'));
router.use('/products', require('./products'))

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err);}
        res.redirect('/');
    });
});

module.exports = router;