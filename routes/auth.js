const mongoose = require(`mongoose`)
const createError = require(`http-errors`);
const router = require(`express`).Router()

router.get(`/register`, async (req, res, next)=> {
    res.status(200).json({success: true, msg: `Register Route`})
})

router.get('/login', (req, res) => {
    res.send("sdf");
})



module.exports = router;