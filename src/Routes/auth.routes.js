const router = require(`express`).Router();
const authController = require('../controller/auth.controller')

router.post('/verificationEmail',authController.VerificationEmail_ve00)
router.post('/register',authController.RegisterUser_ru00); //TODO add transactions
router.post('/login', authController.LoginUser_lu00);

module.exports = router;