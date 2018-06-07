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
router.get('/categories', async (req, res, next) => {
  const allCategories = await Category.findAll()
  res.json(allCategories)
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

<<<<<<< HEAD
router.post('/add', async (req, res, next) => {
  if (!req.user.isAdmin) {
    res.sendStatus(403)
  } else {
    try {
      const entry = await Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        imageUrl: req.body.imageUrl
      })
      const addedProduct = entry.dataValues
      res.status(201).json(addedProduct)
    } catch (err) {
      next(err)
    }
  }
})

router.put('/:id', async (req, res, next) => {
  if (!req.user.isAdmin) {
    res.sendStatus(403)
  } else {
    try {
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


=======
>>>>>>> master
module.exports = router
