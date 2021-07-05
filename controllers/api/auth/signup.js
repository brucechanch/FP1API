const bcrypt = require("bcrypt")
const multer = require("multer")
const { body } = require('express-validator')

const { User } = require('../../../models')
const checkValidation = require('../../../helpers/check-validation')

const permittedSignupParams = ['email', 'passwordHash']

const validation = [
  body('email')
    .notEmpty().withMessage('Email is Required')
    .isEmail().withMessage('Email must be valid')
    .custom(async function(email) {
      if (email) {
        const user = await User.findOne({ where: { email } })
        if (user) return Promise.reject()
      }
    }).withMessage('Email already in use'),
  body('password')
    .notEmpty().withMessage('Password is Required')
    .isLength({ min: 6 }).withMessage('Password must be longer or equal to 6 characters')
]

const userSerializer = function(values) {
  const { ...user } = values.dataValues
  delete user.passwordHash
  return user
}

const apiAuthSignup = async function(req, res) {
  const { body: userParams } = req

  const user = await User.build(userParams, { attributes: permittedSignupParams })
  user.passwordHash = await bcrypt.hash(userParams.password, 10)
  await user.save()

  res.status(200).json(userSerializer(user))
}

module.exports = [multer().none(), checkValidation(validation), apiAuthSignup]