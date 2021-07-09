
const router = require(`express`).Router();
const metaController = require('../controller/meta.controller')

router.use('/uname_unique', metaController.UniqueUsername)
router.use('/email_unique',metaController.UniqueEmail)

module.exports = router