const router = require(`express`).Router();

router.use('/auth/register', require('./auth/auth.register'));
router.use('/auth/login', require('./auth/auth.login'));
router.use('/auth/verifyEmail', require('./auth/auth.verifyEmail'))

router.use('/meta/uname_unique', require('./meta/meta.uname_unique'))

router.use('/fetch/my_profile', require('./fetch/fetch.my_profile'))

router.use('/org', require('./org/org.create'));

module.exports = router;