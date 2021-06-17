const router = require(`express`).Router();

// router.use(`/auth`, require(`./auth`));


router.use('/register', require('./auth/register'));
// router.use('/login', require('./auth/login'));





module.exports = router;