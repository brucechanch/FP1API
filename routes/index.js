const { Router } = require('express')
const router = Router()

const getUserByToken = require('../helpers/get-user-by-token')

router.use(getUserByToken)

router.post(  '/api/auth/signup',                             require('../controllers/api/auth/signup'))
router.post(  '/api/auth/login',                              require('../controllers/api/auth/login'))
router.delete('/api/auth/logout',                             require('../controllers/api/auth/logout'))

router.get(   '/api/my/profile',                              require('../controllers/api/my/profile/get-show'))
router.put(   '/api/my/profile',                              require('../controllers/api/my/profile/update-profile'))
router.put(   '/api/my/profile/password',                     require('../controllers/api/my/profile/password'))

router.get(   '/api/my/requests',                             require('../controllers/api/my/requests/get-index'))
router.post(  '/api/my/requests',                             require('../controllers/api/my/requests/create-request'))
router.get(   '/api/my/requests/:RequestId',                  require('../controllers/api/my/requests/get-request'))
router.put(   '/api/my/requests/:RequestId',                  require('../controllers/api/my/requests/update-request'))
router.delete('/api/my/requests/:RequestId',                  require('../controllers/api/my/requests/delete-request'))


router.use(function(req, res) {
  return res.status(404).json({ message: 'Page Not Found'})
})

module.exports = router