const router = require('express').Router()
module.exports = router

const adminGateway = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.sendStatus(403)
  }
}

const userGateway = (req, res, next) => {
  if (!req.user) {
    res.sendStatus(403)
  } next()
}

router.use('/orders', userGateway, require('./orders'))
router.use('/cart', require('./cart'))
router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/admin', adminGateway, require('./admin'))
router.use('/reviews', require('./review'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
