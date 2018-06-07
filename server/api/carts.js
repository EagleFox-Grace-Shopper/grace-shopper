const express = require('express')
const router = express.Router()
const {CartItem, Product} = require('../db/models')

//route to get all the items in the cart
router.get('/:userId', async (req, res, next) => {
  const cartItems = await CartItem.findAll({
    where: {
      userId: req.params.userId,
    }
  })
  res.json(cartItems)
})

//route posts and item to a user's cart
router.post('/:userId', async (req, res, next) => {
  //route should post an item into the database
  //what is the best way to pass in the item number and quantity?
  ////in this case we pass it in the req.body

  //make sure productId refers to an existing product
  try {
    const product = Product.findById(req.body.productId)
    const productQuantity = req.body.quantity ?
      req.body.quantity :
      1
    console.log(productQuantity)
    const cartItem = await CartItem.create(
      {
        where: {
          userId: req.params.userId,
          productId: product.dataValue.id,
        },
        defaults: {
          quantity: productQuantity
        }
      }
    )
    res.json(cartItem[0])
  } catch (error){
    next(error)
  }

  //create the cart item with association, consider using build:
  ////does it need to be saved into the database everytime we query
  ////this post request, or can we trigger a save to database request
  ////somewhere else?
})


module.exports = router
