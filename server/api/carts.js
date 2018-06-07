const express = require('express')
const router = express.Router()
const {CartItem, Product} = require('../db/models')

//route gets all the items in a user's cart
router.get('/:userId', async (req,res,next) => {
  const cartItems = await CartItem.findAll({
    where: {
      userId: req.params.userId,
    }
  })
})

//route posts an item to a user's cart
router.post('./userId' async (req,res,next) => {
  //route should post an item into the database
  //what is the best way to pass in the item number and quantity?
  ////in this case we pass it in the req.body

  //make sure productId refers to an existing product
  try{
    const product = Product.findById(req.body.productId)
    const quantity = req.body.quantity ?
      req.body.quantity :
      1
    //create the cart item with association, consider using build:
    ////does it need to be saved into the database everytime we query
    ////this post request, or can we trigger a save to database request
    ////somewhere else?
    const cartItem = await CartItem.create(
      {
         
      }
    )
    return cartItem
  }catch(e){
    next(e);
  }

}

module.exports = router
