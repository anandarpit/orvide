const UserMetaSchema = require('../model/User/UserMeta')
const createError = require(`http-errors`)
const {MyProfile} = require('../services/fetch.services')
const catchAsync = require('../utils/catchAsync')
const {createStructure_joi_cs00} = require('../validation/struc.validation')

exports.CreateStructure_ctrl_cs00 = catchAsync(async (req, res, next) => {
    

      const validateStruc = await c().validateAsync(req.body)
})