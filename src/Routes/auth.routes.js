const router = require(`express`).Router();
const authController = require('../controller/auth.controller')
const {isLoggedIn,decodeToken} = require('../middleware/auth.middleware')

router.post('/verificationEmail',authController.VerificationEmail_ctrl_ve00)
router.post('/register',authController.RegisterUser_ctrl_ru00); //TODO add transactions
router.post('/login', authController.LoginUser_ctrl_lu00);

router.get('/',isLoggedIn)
module.exports = router;