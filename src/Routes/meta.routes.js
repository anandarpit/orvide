const router = require(`express`).Router();
const metaController = require('../controller/meta.controller')

router.use('/uname_unique', metaController.UniqueUsername_uu00) //Checks if the username is available or not 
router.use('/email_unique',metaController.UniqueEmail_ue00) // Checks if the email is available or not

module.exports = router