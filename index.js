const router = require(`express`).Router();

router.use('/api', require('./api/api.index'));

module.exports = router;