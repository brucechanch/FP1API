const { Request } = require('../../../models')

module.exports = async function(req, res, next) {
  const { locals: { currentUser } } = res
  const { params } = req

  const RequestId = Number(params.RequestId) || 0 //RequestId referring the /api/requests/:RequestId
  const request = await Request.findOne({ where: { id: RequestId, UserId: currentUser.id }})
  if (!request) return res.status(404).json({ message: `Request with ID: ${RequestId} not found!` })

  res.locals.currentRequest = request

  next()
}