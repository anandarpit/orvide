
const router = require(`express`).Router();
const metaController = require('../controller/meta.controller')

router.use('/uname_unique', metaController.unique_uname)
router.use('/email_unique',metaController.unique_email)

module.exports = router