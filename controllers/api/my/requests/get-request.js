const getTodoById = require('../../../../helpers/get-user-by-token')

const apiRequestsGetShow = async function (req, res) {
  const { locals: { currentRequest } } = res

  return res.status(200).json({ request: currentRequest })
}

module.exports = [getTodoById, apiRequestsGetShow]