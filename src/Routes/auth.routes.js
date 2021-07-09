const router = require(`express`).Router();
const authController = require('../controller/auth.controller')

router.post('/register',authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/verifyEmail',authController.verifyEmail)







module.exports = router;