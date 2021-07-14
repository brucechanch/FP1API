const { body } = require('express-validator')

const { authenticateCurrentUserByToken, checkValidation, MulterParser } = require('../../../../helpers')
const { Request } = require('../../../../models')

const permittedChangeParams = ['title','note', 'plan', 'template']

const validation = [
  body('title').isString().withMessage('Title must be valid').notEmpty().withMessage('Title is Required'),
  body('note').isString().withMessage('Note must be valid').notEmpty().withMessage('Note is Required'),
  body('plan').isString().withMessage('Plan must be valid').notEmpty().withMessage('Plan must be selected'),
  body('template').isString().withMessage('Template must be valid').notEmpty().withMessage('Template must be selected')
]

const apiMyRequestsUpdate = async function(req, res) {
  const { body, params: { RequestId } } = req
  const { locals: { currentUser } } = res

  const request = await Request.findOne({
    where: {
      UserId: currentUser.id,
      id: Number(RequestId) || 0
    }
  })

  if (!request) return res.status(404).json({ message: `Request with ID: ${RequestId} not found!` })

  await request.update(body, { fields: permittedChangeParams })
  res.status(200).json({ request })
}

module.exports = [authenticateCurrentUserByToken, MulterParser.none(), checkValidation(validation), apiMyRequestsUpdate]