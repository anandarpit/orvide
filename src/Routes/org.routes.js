const router = require(`express`).Router();
const { createOrg, updateInviteLinkStatus, getUserOrgDetails } = require('../controller/org.controller');
const { isLoggedIn, isCreator } = require('../middleware/auth.middleware');
const validate = require('../middleware/validator.middleware')
const { orgValidation } = require('../validation')


// router.get('/org',isLoggedIn,menuController.getOrg);
router.post('/createOrg',isLoggedIn, createOrg);

router.post(
    '/invite-link-status',
    validate.orgInviteLink,
    updateInviteLinkStatus
    
);

router.get('/fetch-user-org-detail', isLoggedIn, getUserOrgDetails);





module.exports = router

