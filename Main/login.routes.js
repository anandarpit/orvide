const express = require('express') , router = express.Router(), path = require('path')
const {isAlreadyLoggedIn} = require('../jwt/tokens')
const staticpath =path.join(__dirname,'../static');
router.use(express.static(staticpath));

router.get('/',isAlreadyLoggedIn, (req, res, next) => {
   
    if(req.loginStatus)
    res.render(staticpath+'/main.ejs')
})
router.get('/login',isAlreadyLoggedIn, (req, res, next) => {

    if(req.loginStatus)
    res.render(staticpath+'/main.ejs')
})

router.get('/register',(req, res, next) => {

    res.render(staticpath+'/register.ejs')
})

module.exports = router;