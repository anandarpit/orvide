const router = require(`express`).Router();
const {fetchOTP_test} = require('./controllers/otp.controller')
router.post('/fetchOTP', fetchOTP_test);

module.exports = router;