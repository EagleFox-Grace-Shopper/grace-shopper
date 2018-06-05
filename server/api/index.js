const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))

router.use('/admin', (req, res, next) => {
  if (req.user) {
    require('./admin')
  } else {
    res.status(401).send('Unauthorized')
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
