const bcrypt = require("bcrypt")
const { body } = require('express-validator')

const { authenticateCurrentUserByToken, checkValidation, MulterParser } = require('../../../../helpers')

const validation = [
  body('currentPassword')
    .notEmpty().withMessage('Current Password  is Required'),
  body('newPassword')
    .notEmpty().withMessage('New Password is Required')
    .isLength({ min: 6 }).withMessage('Password must be longer or equal to 6 characters')
]

const userSerializer = function (user) {
  const newUser = { ...user.dataValues }
  delete newUser.passwordHash
  return { user: newUser }
}

const apiMyProfilePasswordUpdate = async function(req, res) {
  const { body } = req
  const { locals: { currentUser } } = res

  const validPassword = await bcrypt.compare(body.currentPassword, currentUser.passwordHash)
  if (!validPassword) return res.status(401).json({ message: 'Credentials is incorrect' })

  currentUser.passwordHash = await bcrypt.hash(body.newPassword, 10)
  await currentUser.save()

  res.status(200).json(userSerializer(currentUser))
}

module.exports = [authenticateCurrentUserByToken, MulterParser.none(), checkValidation(validation), apiMyProfilePasswordUpdate]