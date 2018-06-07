const router = require('express').Router()
module.exports = router

const adminGateway = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.sendStatus(403)
  } else {
    next()
  }
}

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/categories', require('./categories'))
router.use('/carts', require('./carts'))
router.use('/admin', adminGateway, require('./admin'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
