const createError = require(`http-errors`);
const router = require("express").Router();
const { uname_unique } = require("../../validation/validation.meta")
const {unameUsername} = require("../../controller/controller.meta");


router.post('/', async (req, res, next) => {
    try {
        const validatedResult = await uname_unique().validateAsync(req.body);
        const result = await unameUsername(validatedResult.uname);
        if(result){return res.send(result); }
        else return res.end()

    } catch (error) {
        if(error.code = `UU1`) return res.send(error.message)
        return res.set(500).send("Internal Server Error")
    }
})

module.exports = router;