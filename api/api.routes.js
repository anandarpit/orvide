const router = require(`express`).Router();

router.use('/auth/register', require('./auth/auth.register'));
router.use('/auth/login', require('./auth/auth.login'));
router.use('/auth/verifyEmail', require('./auth/auth.verifyEmail'))
router.use('/meta/uname_unique', require('./meta/meta.uname_unique'))

router.use('/org', require('./auth/auth.org'));
router.use('/redirectLogin', require('./auth/auth.redirect'));

module.exports = router;