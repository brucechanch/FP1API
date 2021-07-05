const { Request } = require('../../../../models')
const authenticateCurrentUserByToken = require('../../../../helpers/authenticate-current-user-by-token')

const apiRequestsGetIndex = async function (req, res) {
  const { locals: { currentUser } } = res
  const { query } = req

  const page = query.page || 1
  const limit = 10
  const offset = (page - 1) * limit
  const sortField = query.sortField || 'createdAt'
  const sortOrder = query.sortOrder || 'ASC'

  const result = await Request.findAndCountAll({
    where: {
      UserId: currentUser.id
    },
    offset,
    limit,
    order: [[sortField, sortOrder]]
  })

  return res.status(200).json({ requests: result.rows, meta: { totalPages: Math.floor(result.count / limit), currentPage: page } })
}

module.exports = [authenticateCurrentUserByToken, apiRequestsGetIndex]