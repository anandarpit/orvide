const router = require(`express`).Router();

router.use('/api', require('./api/api.routes'));
router.use('/',require('./Main/main.routes'))


module.exports = router;