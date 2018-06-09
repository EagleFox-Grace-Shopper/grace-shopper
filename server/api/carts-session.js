const express = require('express')
const router = express.Router()

//adds a req.session.cart if one does not exist
router.use((req, res, next) => {
  //if (!req.session.counter) req.session.counter = 0
  //console.log('counter', ++req.session.counter)
  if (!req.session.cart) req.session.cart = {}
  if (!req.session.cart[req.body.productId]){
    req.session.cart[req.body.productId] = 0
  }
  next()
})


router.get('/:userId', (req, res, next) => {
  res.json(req.session.cart)
})

router.post('/:userId/add', (req, res, next) => {
  if (!req.session.cart[req.body.productId])req.session.cart[req.body.productId] = 0
  req.session.cart[req.body.productId] += Number(req.body.quantity)
  res.sendStatus(200)
})

router.put('/:userId/update', (req, res, next) => {
  req.session.cart[req.body.productId] = Number(req.body.quantity)
  res.sendStatus(200)
})

router.post('/:userId/subtract', (req, res, next) => {
  req.session.cart[req.body.productId] -= Number(req.body.quantity)
  if (req.session.cart[req.body.productId] < 1) {
    delete req.session.cart[req.body.productId]
  }
  res.sendStatus(200)
})

router.post('/:userId/delete', (req, res, next) => {
  if (req.session.cart[req.body.productId]) {
    delete req.session.cart[req.body.productId]
  }
  res.sendStatus(200)
})

module.exports = router
