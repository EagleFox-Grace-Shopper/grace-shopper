const router = require('express').Router()
const { Category, Product } = require('../db/models')


module.exports = router

function clearCartRow(cartItem) {

}

router.post('/cart/checkout', async (req, res, next) => {
  const userId = req.user ? req.user.id : null
  const orderEmail = req.user ? req.user.email : req.body.email
  const totalAmount = req.body.cart.reduce((total, item) => {
    total += item.price * item.quantity
  })
  const orderCart = req.body.cart.map(async (item) => {
    const product = await Product.findById(item.productId)
    return product.dataValues
  })
  const orderInfo = await Order.create({
    userId,
    orderEmail,
    totalAmount,
  })
  await OrderLine.bulkCreate(orderCart.map(item => {
    return {
      orderId: orderInfo.dataValues.id,
      productId: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: item.quantity,
    }
  }))
  req.body.cart.forEach(item => {
    clearCartRow(item.id)
  })
  const cart = await getCart()
  res.setStatus(201).json({ cart, orderInfo })
})
