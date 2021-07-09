const router = require(`express`).Router();
const authController = require('../controller/auth.controller')

router.post('/register',authController.RegisterUser);
router.post('/login', authController.LoginUser);
router.post('/verifyEmail',authController.VerifyEmail)







module.exports = router;