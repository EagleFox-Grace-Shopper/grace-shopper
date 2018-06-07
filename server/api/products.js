//api get for product info
const router = require('express').Router()
const { Product, User, Category } = require('../db/models')

router.get('/', async (req, res, next) => {
  if (req.query.categoryId) {
    const response = await Category.findAll({
      include: [
        { model: Product }
      ],
      where: {
        id: req.query.categoryId
      }
    })
    const productsByCat = response[0].dataValues.products
    res.json(productsByCat)
  } else {
    const productsAll = (req.query.search) ?
      await Product.findAll(
        {
          where:
            {
              title:
                { $iLike: '%' + req.query.search + '%' }
            }
        }
      )
      : await Product.findAll({})
    res.json(productsAll)
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

router.get('/category/:categoryId', async (req, res, next) => {
  try {
    const response = await Category.findAll({
      include: [
        { all: true }
      ],
      where: {
        id: req.params.categoryId
      }
    })
    const productsByCat = response[0].dataValues.products
    res.json(productsByCat)
  } catch (error) {
    next(error)
  }
})

module.exports = router
