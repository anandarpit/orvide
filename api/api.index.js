const router = require(`express`).Router();

router.use('/register', require('./auth/auth.register'));
router.use('/login', require('./auth/auth.login'));
// router.use('/verify', require('./auth/auth.verify'))

module.exports = router;