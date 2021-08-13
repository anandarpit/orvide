const router = require(`express`).Router();
const {UniqueUsername, UniqueEmail, UniqueOrgName, UniqueOrgId} = require('../controller/meta.controller')
const {isLoggedIn} = require('../middleware/auth.middleware');

router.post('/uname_unique', UniqueUsername) //Checks if the username is available or not 
router.post('/email_unique', UniqueEmail) // Checks if the email is available or not
router.post('/unique_org_name', isLoggedIn, UniqueOrgName);
router.post('/unique_org_id', isLoggedIn, UniqueOrgId);
module.exports = router