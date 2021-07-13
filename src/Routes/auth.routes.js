const router = require(`express`).Router();
const authController = require('../controller/auth.controller')
const {isLoggedIn} = require('../middleware/auth.middleware')
const otpController = require('../controller/otp.controller')

router.post('/verificationEmail',authController.VerificationEmail_ve00)
router.post('/register',authController.RegisterUser_ru00); //TODO add transactions
router.post('/login', authController.LoginUser_lu00);
router.post('/otp',otpController.getOTP)

router.get('/',isLoggedIn)
module.exports = router;