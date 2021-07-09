const router = require(`express`).Router();

router.use('/api', require('./Routes/index'));



module.exports = router;