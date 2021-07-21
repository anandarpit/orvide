const router = require(`express`).Router();
const {CreateOrg_ctrl,unique_orgName_ctrl,unique_orgId_ctrl} = require('../controller/org.controller');
const {isLoggedIn} = require('../middleware/auth.middleware');

// router.get('/org',isLoggedIn,menuController.getOrg);
router.post('/createOrg',isLoggedIn,CreateOrg_ctrl);
router.post('/unique_org_name',isLoggedIn,unique_orgName_ctrl);
router.post('/unique_org_id',isLoggedIn,unique_orgId_ctrl);
module.exports = router

