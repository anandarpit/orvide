const router = require(`express`).Router();

router.use('/auth',require('./auth.routes'));
router.use('/fetch', require('./fetch.routes'));

router.use('/meta',require('./meta.routes'));

module.exports = router;