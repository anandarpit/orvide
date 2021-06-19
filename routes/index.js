const router = require(`express`).Router();

router.use('/register', require('./auth/register'));
router.use('/login', require('./auth/login'));

//TODO Temporary
// router.use('/', (req, res, next) => {
//     res.status(200).send("This is www.orvide.com")
// });


module.exports = router;