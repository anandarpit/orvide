
const router = require(`express`).Router();
const metaController = require('../controller/meta.controller')

router.use('/uname_unique', metaController.UniqueUsername_uu00)
router.use('/email_unique',metaController.UniqueEmail_ue00)

module.exports = router