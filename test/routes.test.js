const router = require(`express`).Router();
const testController  = require('./controllers/test.controller');

router.post('/fetchOTP', testController.fetchOTP);
router.post('/token',testController.fetchToken);


module.exports = router;