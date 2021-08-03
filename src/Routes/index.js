const router = require(`express`).Router();

router.use('/auth',require('./auth.routes'));
router.use('/fetch', require('./fetch.routes'));
router.use('/meta',require('./meta.routes'));
router.use('/org',require('./org.routes'));
router.use('/struc',require('./struc.routes'));

module.exports = router;