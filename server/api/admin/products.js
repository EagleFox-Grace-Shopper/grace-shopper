//api get for product info
const router = require('express').Router()
const { Product } = require('../../db/models')

router.post('/add', async (req, res, next) => {
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

router.put('/:id', async (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  res.sendStatus(204)
})

module.exports = router
