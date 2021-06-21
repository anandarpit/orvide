const router = require(`express`).Router();

router.use('/api', require('./api/api.routes'));

module.exports = router;