const router = require(`express`).Router();
const authController = require('../controller/auth.controller')

router.post('/verifyEmail',authController.VerifyEmail)
router.post('/register',authController.RegisterUser);
router.post('/login', authController.LoginUser);

module.exports = router;