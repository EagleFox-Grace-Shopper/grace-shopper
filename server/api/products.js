//api get for product info
const router = require('express').Router()
const { Product, User } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const productsAll = await Product.findAll({})
    res.json(productsAll)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const productById = await Product.findById(req.params.id)
    res.json(productById)
  } catch (error) {
    next(error)
  }
})

router.post('/add', (req, res, next) => {
  if (!req.user.isAdmin) {
    res.sendStatus(403)
  } else {
    try {
      Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        imageUrl: req.body.imageUrl
      })
      res.sendStatus(201)
    } catch (err) {
      next(err)
    }
  }
})

router.put('/:id', (req, res, next) => {
  if (!req.user.isAdmin) {
    res.sendStatus(403)
  } else {
    try {
      Product.update({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        imageUrl: req.body.imageUrl
      }, {
        where: { id: req.params.id }
      })
      res.sendStatus(201)
    } catch (err) {
      next(err)
    }
  }
})

router.delete('/:id', (req, res, next) => {
  if (!req.user.isAdmin) {
    res.sendStatus(403)
  } else {
    try {
      Product.destroy({
        where: {
          id: req.params.id
        }
      })
      res.sendStatus(204)
    } catch (err) {
      next(err)
    }
  }
})

module.exports = router
