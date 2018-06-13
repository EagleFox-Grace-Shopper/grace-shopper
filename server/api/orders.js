const router = require('express').Router()
const { Order, OrderLine } = require('../db/models')
const { MAILER_AUTH } = require('../../secrets')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: MAILER_AUTH
})

router.get('/', async (req, res, next) => {
  try {
    let allOrders
    if (req.user.isAdmin) {
      allOrders = await Order.findAll({
        include: [{
          model: OrderLine,
        }]
      })
    } else {
      allOrders = await Order.findAll({
        where: {
          userId: req.user.id
        },
        include: [{
          model: OrderLine,
        }]
      })
    }
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

const sendShippingConfirmation = (email, orderId) => {
  const mailOptions = {
    from: 'eaglefoxshopper@gmail.com',
    to: email,
    subject: `EagleFox Shopper: Order ${orderId} Has Shipped!`,
    html: '<p>Order shipped</p>'
  }
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) { console.log(err) }
    else { console.log(info) }
  })
}

module.exports = router

