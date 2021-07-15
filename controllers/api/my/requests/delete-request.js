const { authenticateCurrentUserByToken } = require('../../../../helpers')
const { Request } = require('../../../../models')

const apiMyRequestsDestroy = async function(req, res) {
  const { params: { RequestId } } = req
  const { locals: { currentUser } } = res

  const request = await Request.findOne({
    where: {
      UserId: currentUser.id,
      id: Number(RequestId) || 0
    }
  })
  if (!request) return res.status(404).json({ message: `Request with ID: ${id} not found!` })

  await request.destroy()
  res.status(204).json('Request Deleted')
}

module.exports = [authenticateCurrentUserByToken, apiMyRequestsDestroy]