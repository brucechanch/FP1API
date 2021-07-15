const bcrypt = require("bcrypt")
const multer = require("multer")
const { body } = require('express-validator') // add check****************

const { User } = require('../../../models')
const checkValidation = require('../../../helpers/check-validation')
const MulterParser = require('../../../helpers/MulterParser')

const permittedSignupParams = ['username', 'email', 'passwordHash','address','phone']

const validation = [

  body('username')
  .notEmpty().withMessage('UserName is Required')
  .custom(async function(username) {
    if (username) {
      const user = await User.findOne({ where: { username } })
      if (user) return Promise.reject()
    }
  }).withMessage('username already in use'),

  body('email')
    .notEmpty().withMessage('Email is Required')
    .isEmail().withMessage('Email must be valid')
    .custom(async function(email) {
      if (email) {
        const user = await  User.findOne({ where: { email } })
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

  console.log(userParams)

  // Build a new user
  const user = await User.build(userParams, { attributes: permittedSignupParams })

  // Set the passwordHash with the hashed password with 10 rounds of salting
  user.passwordHash = await bcrypt.hash(userParams.password, 10)
  // Saves the user
  await user.save()

  // Prevents the passwordHash from being sent!
  res.status(200).json(userSerializer(user))
}

module.exports = [MulterParser.none(), checkValidation(validation), apiAuthSignup]
