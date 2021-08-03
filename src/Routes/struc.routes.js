const router = require(`express`).Router();
const {isLoggedIn} = require('../middleware/auth.middleware');
const {CreateStructure_ctrl_cs00} = require('../controller/struc.controller')

/**
 * What are we going to take from the user?
 * 1. Check if he is logged in.
 * 2. Check if he is a member of the organization of the organization and check if he is allowed to create structure.
 * 3. If he is allowed to create structure, then take the request fields. The request fields by the user client include the following:
 * (i) the name of the structure.
 * (ii) the description of the structure.
 * (iii) the user is the initiator of the structure.
 * (iv) the organization id.
 */
router.post('/create', isLoggedIn, CreateStructure_ctrl_cs00)

module.exports = router