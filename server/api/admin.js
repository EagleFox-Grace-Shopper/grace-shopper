const router = require('express').Router()
const { User, Product } = require('../db/models')
module.exports = router

router.post('/addproduct', (req, res, next) => {
  try {
    Product.create({
      title: req.body.product.title,
      description: req.body.product.description,
      price: req.body.product.price,
      quantity: req.body.product.quantity,
      imageUrl: req.body.product.imageUrl
    })
  } catch (err) {
    next(err)
  }
})

router.put('/editproduct', (req, res, next) => {
  try {
    Product.update({
      title: req.body.product.title,
      description: req.body.product.description,
      price: req.body.product.price,
      quantity: req.body.product.quantity,
      imageUrl: req.body.product.imageUrl
    }, {
      where: { id: req.body.product.id }
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/deleteproduct', (req, res, next) => {
  try {
    Product.destroy({
      where: {
        id: req.body.product.id
      }
    })
  } catch (err) {
    next(err)
  }
})
