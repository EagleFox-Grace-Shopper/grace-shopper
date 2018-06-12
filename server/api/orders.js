const router = require('express').Router()
const { Order, OrderLine } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({
      where: {
        userId: req.user.id
      },
      include: [{
        model: OrderLine,
      }]
    })
    res.json(allOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/:orderid', async (req, res, next) => {
  try {
    const singleOrder = await OrderLine.findAll({
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

