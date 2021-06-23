const router = require(`express`).Router();

router.use('/register', require('./auth/auth.register'));
router.use('/login', require('./auth/auth.login'));
router.use('/verifyEmail', require('./auth/auth.verifyEmail'))

module.exports = router;