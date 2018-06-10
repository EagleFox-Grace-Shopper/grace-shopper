const router = require('express').Router()
const { Orders, OrderLine } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allOrders = OrderLine.findAll()
    res.json(allOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/:orderid', async (req, res, next) => {
  try {
    const singleOrder = OrderLine.findAll({
      where: {
        orderId: req.params.orderid
      }
    })
    res.json(singleOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router

