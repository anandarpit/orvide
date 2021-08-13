const router = require(`express`).Router();
const { createOrg, getOrg, genLink, updateInviteLinkStatus } = require('../controller/org.controller');
const { isLoggedIn, isCreator } = require('../middleware/auth.middleware');
const validate = require('../middleware/validator.middleware')
const { orgValidation } = require('../validation')


// router.get('/org',isLoggedIn,menuController.getOrg);
router.post('/createOrg',isLoggedIn, createOrg);
router.post('/', isLoggedIn, getOrg)
// router.post('/invite-link-status', orgValidation.inviteLinkStatus, isLoggedIn, isCreator, updateInviteLinkStatus);
router.post(
    '/invite-link-status',
    validate.orgInviteLink,
    (req, res, next) => {
        res.send("validated");
    }
);




module.exports = router

