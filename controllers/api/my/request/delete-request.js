const { authenticateCurrentUserByToken } = require('../../_helpers')
const { Request } = require('../../../models')

const apiMyRequestsDestroy = async function(req, res) {
  const { params: { id } } = req
  const { locals: { currentUser } } = res
  const request = await Request.findOne({
    where: {
      UserId: currentUser.id,
      id: Number(id) || 0
    }
  })
  if (!request) return res.status(404).json({ message: `Request with ID: ${id} not found!` })

  await request.destroy()
  res.status(204).json('Request Deleted')
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyRequestsDestroy]