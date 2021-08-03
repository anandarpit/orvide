const router = require(`express`).Router();
const {CreateOrg_ctrl} = require('../controller/org.controller');
const {isLoggedIn} = require('../middleware/auth.middleware');

// router.get('/org',isLoggedIn,menuController.getOrg);
router.post('/createOrg',isLoggedIn,CreateOrg_ctrl);

module.exports = router

