const router = require(`express`).Router();
const authController = require('../controller/auth.controller')
const {isLoggedIn,decodeToken} = require('../middleware/auth.middleware')

router.post('/verificationEmail',authController.VerificationEmail_ctrl_ve00) //Send a verification Email with the OTP to the user
router.post('/register',authController.RegisterUser_ctrl_ru00); //Registers the complete user into the users and usermetas using transactions
router.post('/login', authController.LoginUser_ctrl_lu00); //Logins the user and returns an access token
router.post('/otp',require('../controller/otp.controller').otp);
// router.get('/',isLoggedIn)
module.exports = router;