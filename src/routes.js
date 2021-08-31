const router = require(`express`).Router();

router.use('/api', require('./Routes/index.js'));
router.use('/test', require('../test/routes.test'))

module.exports = router;