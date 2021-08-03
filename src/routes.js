const router = require(`express`).Router();

router.use('/api', require('./routes/index'));
router.use('/test', require('../test/routes.test'))

module.exports = router;