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

router.put('/edit', async (req, res, next) => {
  try {
    req.body.forEach(async cat => {
      await Category.update({
        name: cat.name
      }, {
        where: { id: cat.id },
        returning: true
      })

      const allcats = await Category.findAll()
      res.json(allcats)

    })
  } catch (err) {
    next(err)
  }
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
