const router = require(`express`).Router();
const metaController = require('../controller/meta.controller')
const {CreateOrg_ctrl,unique_orgName_ctrl,unique_orgId_ctrl} = require('../controller/meta.controller');
const {isLoggedIn} = require('../middleware/auth.middleware');

router.post('/uname_unique', metaController.UniqueUsername_uu00) //Checks if the username is available or not 
router.post('/email_unique',metaController.UniqueEmail_ue00) // Checks if the email is available or not
router.post('/unique_org_name',isLoggedIn,unique_orgName_ctrl);
router.post('/unique_org_id',isLoggedIn,unique_orgId_ctrl);
module.exports = router