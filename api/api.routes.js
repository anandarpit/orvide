const router = require(`express`).Router();

router.use('/register', require('./auth/auth.register'));
router.use('/login', require('./auth/auth.login'));
router.use('/verifyEmail', require('./auth/auth.verifyEmail'))
router.use('/uname_unique', require('./meta/meta.uname_unique'))

router.use('/org', require('./auth/auth.org'));
router.use('/redirectLogin', require('./auth/auth.redirect'));

module.exports = router;