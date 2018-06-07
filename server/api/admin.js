//api get for product info
const router = require('express').Router()
const { Product, Category } = require('../db/models')

router.post('/products/add', async (req, res, next) => {
  const entry = await Product.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    imageUrl: req.body.imageUrl
  })
  const addedProduct = entry.dataValues
  res.status(201).json(addedProduct)
})

router.put('/products/:id', async (req, res, next) => {
  const entry = await Product.update({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    imageUrl: req.body.imageUrl
  }, {
    where: { id: req.params.id },
    returning: true
  })
  const editedProduct = entry[1][0].dataValues
  res.status(201).json(editedProduct)
})

router.delete('/products/:id', (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  res.sendStatus(204)
})

router.post('/categories/add', async (req, res, next) => {
  const entry = await Category.create({
    name: req.body.name
  })
  const addedCategory = entry.dataValues
  res.status(201).json(addedCategory)
})

router.put('/categories/:id', async (req, res, next) => {
  const entry = await Category.update({
    name: req.body.title
  }, {
    where: { id: req.params.id },
    returning: true
  })
  const editedCategory = entry[1][0].dataValues
  res.status(201).json(editedCategory)
})

router.delete('/categories/:id', (req, res, next) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  res.sendStatus(204)
})

module.exports = router
