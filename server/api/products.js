//api get for product info
const router = require('express').Router()
const {Product} = require('../db/models')


router.get('/', async (req, res, next) => {
  try {
    const productsAll = await Product.findAll({})
    res.json(productsAll)
  } catch (error){
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const productById = await Product.findById(req.params.id)
    res.json(productById)
  } catch (error){
    next(error)
  }
})

router.post('/add', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
  try {
    Product.update({
      title: req.body.product.title,
      description: req.body.product.description,
      price: req.body.product.price,
      quantity: req.body.product.quantity,
      imageUrl: req.body.product.imageUrl
    }, {
      where: { id: req.params.id }
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', (req, res, next) => {
  try {
    Product.destroy({
      where: {
        id: req.params.id
      }
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
