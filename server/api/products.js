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

router.post('/:id', async (req, res, next) =>{
  //
})

module.exports = router
