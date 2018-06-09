//api get for product info
const router = require('express').Router()
const { Category } = require('../../db/models')

router.post('/add', async (req, res, next) => {
  const entry = await Category.create({
    name: req.body.name
  })
  const addedCategory = entry.dataValues
  res.status(201).json(addedCategory)
})

router.put('/:id', async (req, res, next) => {
  const entry = await Category.update({
    name: req.body.name
  }, {
    where: { id: req.params.id },
    returning: true
  })
  const editedCategory = entry[1][0].dataValues
  res.status(201).json(editedCategory)
})

router.delete('/:id', (req, res, next) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  res.sendStatus(204)
})

module.exports = router
