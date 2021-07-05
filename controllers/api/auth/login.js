const bcrypt = require("bcrypt")
const crypto = require('crypto')
const multer = require("multer")
const { body } = require('express-validator')

const { User } = require('../../../models')
const checkValidation = require('../../../helpers/check-validation')

const validation = [
  body('email')
    .notEmpty().withMessage('Email is Required')
    .isEmail().withMessage('Email must be valid'),
  body('password')
    .notEmpty().withMessage('Password is Required')
]

const userSerializer = function (user) {
  const newUser = { ...user.dataValues }
  delete newUser.passwordHash
  return { user: newUser }
}

const apiAuthLogin = async function(req, res) {
  const { body: { email, password } } = req

  let user = await User.findOne({ where: { email } })
  if (!user) return res.status(404).json({ message: `User not found with email: ${email}` })

  const validPassword = await bcrypt.compare(password, user.passwordHash)
  if (!validPassword) return res.status(401).json({ message: 'Credentials is incorrect' })

  const token = crypto.randomBytes(64).toString('hex')
  await user.createAuthenticityToken({ token })
  req.session.token = token

  res.status(200).json(userSerializer(user))
}

module.exports = [multer().none(), checkValidation(validation), apiAuthLogin]