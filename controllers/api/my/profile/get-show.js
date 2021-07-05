const authenticateCurrentUserByToken = require('../../../../helpers/authenticate-current-user-by-token')

const userSerializer = function (user) {
  const newUser = { ...user.dataValues }
  delete newUser.passwordHash
  return { user: newUser }
}

const apiTodosGetShow = async function (req, res) {
  const { locals: { currentUser } } = res

  res.status(200).json(userSerializer(currentUser))
}

module.exports = [authenticateCurrentUserByToken, apiTodosGetShow]