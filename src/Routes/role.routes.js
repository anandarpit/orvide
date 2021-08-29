const router = require(`express`).Router();
const {isLoggedIn} = require('../middleware/auth.middleware');
const {roleController} = require('../controller')

router.post('/make/admin', isLoggedIn, roleController.MakeAdmin)

module.exports = router