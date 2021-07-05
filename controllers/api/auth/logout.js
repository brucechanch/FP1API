const apiAuthLogout = async function(req, res) {
  req.session.token = ''
  res.status(200).json()
}

module.exports = [apiAuthLogout]