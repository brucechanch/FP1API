const { body } = require('express-validator')
const { checkValidation, MulterParser, authenticateCurrentUserByToken } = require('../../_helpers')

const permittedCreateRequestParams = ['template', 'note', 'plan']

const validation = [
  body('note')
    .notEmpty().withMessage('Note is Required')
    .isString().withMessage('Note must be valid'),
  body('plan')
    .notEmpty().withMessage('Plan must be selected')
    .isString().withMessage('Plan must be valid'),
  body('template')
    .notEmpty().withMessage('Template must be selected')
    .isString().withMessage('Template must be valid')
]

const apiCreateRequest = async function(req, res) {
  const { body: requestParams } = req
  const currentUser = res.locals.currentUser

  const data = requestParams
  if (req.file && req.file.location) {
    data.photo = req.file.location
  }

  const request = await currentUser.createRequest(data, { attributes: permittedCreateRequestParams })

  res.status(200).json({ request })
}

module.exports = [authenticateCurrentUserByToken('json'), MulterParser.none(), validation, checkValidation, apiCreateRequest]