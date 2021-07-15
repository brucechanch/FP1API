const { body } = require('express-validator')
const { checkValidation, MulterParser, authenticateCurrentUserByToken } = require('../../../../helpers')

const permittedCreateRequestParams = ['title','template', 'note', 'plan']

const validation = [
  body('title')
    .notEmpty().withMessage('Title is Required')
    .isString().withMessage('Title must be valid'),
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
  const { locals: { currentUser } } = res
  const { body } = req

  const request = await currentUser.createRequest(body, { fields: permittedCreateRequestParams })
  return res.status(200).json({ request })

}

module.exports = [authenticateCurrentUserByToken, MulterParser.none(), checkValidation(validation), apiCreateRequest]