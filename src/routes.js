const router = require(`express`).Router();

router.use('/api', require('./Routes/index'));
router.use('/test', require('../test/routes.test'))

module.exports = router;