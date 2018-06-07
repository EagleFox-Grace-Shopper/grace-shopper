const express = require('express')
const router = express.Router()
const {CartItem, Product} = require('../db/models')

//route to get all the items in the cart
router.get('/:userId', async (req, res, next) => {
  const cartItems = await CartItem.findAll({
    where: {
      userId: req.params.userId,
    },
    include: [{
      model: Product,
    }]
  })
  res.json(cartItems)
})

/*
/api/carts/:userId/add
adds a product of a specified quantity to the cart.  If the product
already exists in the cart for the user, this adds the specified quantity

route posts item to a user's cart
  (using userId as cart identification in req.params)
example req.body is:
  {
    productId : 3,
    quantity : 1,
  }

  or

  {
    productId : 3,
  }
*/

router.post('/:userId/add', async (req, res, next) => {
  try {
    const product = await Product.findById(req.body.productId)
    console.log('product', product)
    if (!product){
      throw new Error('product of specified id does not exist')
    }
    const productQuantity = req.body.quantity ?
      Number(req.body.quantity) :
      1
    const cartItem = await CartItem.findOrCreate(
      {
        where: {
          userId: req.params.userId,
          productId: product.dataValues.id,
        },
        defaults: {
          quantity: productQuantity
        }
      }
    )

    if (cartItem[1] === false){
      CartItem.update(
        {
          quantity: productQuantity + cartItem[0].quantity,
        },
        {
          where: {
            id: cartItem[0].id,
          }
        },
      )
    }

    res.json(cartItem[0])
  } catch (error){
    next(error)
  }
})


/*
/api/carts/:userId/update
updates a product to a specified quantity

example req.body is:
  {
    productId : 3,
    quantity : 1,
  }
*/

router.put('/:userId/update', async (req, res, next) => {
  try {
    /*
    const product = await Product.findById(req.body.productId)
    console.log('product', product)
    if (!product){
      throw new Error('product of specified id does not exist')
    }
    */
    const productQuantity = Number(req.body.quantity)
    if (!productQuantity){
      throw new Error('"quantity" not specified in req.body')
    }

    const cartItem = await CartItem.findOne({
      where: {
        userId: req.params.userId,
        productId: req.body.productId,
      }
    })

    if (cartItem){
      const cartItemUpdated = CartItem.update(
        {quantity: productQuantity},
        {where: {id: cartItem.id}},
      )
      res.json(cartItemUpdated)
    }
    else {
      throw new Error('cartItem does not exist in database')
    }
  } catch (error){
    next(error)
  }
})

module.exports = router
