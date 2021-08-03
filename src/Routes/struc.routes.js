const router = require(`express`).Router();
const {isLoggedIn} = require('../middleware/auth.middleware');
const {CreateStructure_ctrl_cs00} = require('../controller/struc.controller')

router.post('/create', isLoggedIn, CreateStructure_ctrl_cs00)

module.exports = router