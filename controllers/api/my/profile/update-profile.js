const { authenticateCurrentUserByToken, MulterParser } = require('../../../../helpers')

const permittedAttributes = ['phone', 'address']

const userSerializer = function (user) {
  const newUser = { ...user.dataValues }
  delete newUser.passwordHash
  return { user: newUser }
}

const apiMyProfilePut = async function(req, res) {
  const { body } = req
  const { locals: { currentUser } } = res

  await currentUser.update(body, { fields: permittedAttributes })

  res.status(200).json(userSerializer(currentUser))
}

module.exports = [authenticateCurrentUserByToken, MulterParser.none(), apiMyProfilePut]