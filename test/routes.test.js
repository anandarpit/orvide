const router = require(`express`).Router();
const {testController} = require('./controllers')

router.post('/fetchOTP', testController.fetchOTP);
router.post('/token',testController.fetchToken);
router.post('/putData',testController.putData);
router.post('/putDataArrays',testController.putDataArrays);

module.exports = router;