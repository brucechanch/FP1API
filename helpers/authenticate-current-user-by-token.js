module.exports = async function(req, res, next) {
  const { locals: { currentUser } } = res

  if (!currentUser) return res.status(401).json({ message: 'Please Log In First!' })

  next()
}