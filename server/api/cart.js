const express = require('express')
const router = express.Router()
const {CartItem, Product} = require('../db/models')

//this sets up the cart and product if one does not exist.
router.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  console.log('req.session.cart is', req.session.cart)
  next()
})

router.get('/getUserInfo', (req, res, next) => {
  res.json(req.user)
})

const getCart = async (id) => {
  //access the cart from the db
  console.log('in getCart function')
  const cartItems = await CartItem.findAll({
    where: {
      userId: id,
    },
    include: [{
      model: Product,
    }]
  })
  console.log('cartItems is: ', cartItems)
  return cartItems
}

/*
GET: /api/cart/
returns the cart
*/
router.get('/', async (req, res, next) => {
  if (!req.user){
    res.json(req.session.cart)
  } else {
    const cartItems = await getCart(req.user.id)
    res.set(200).json(cartItems)
  }
})

/*
POST: /api/cart/
upserts the product of a specified quantity to the cart.

example req.body is:
  {
    productId : 3,
    quantity : 1,
  }
*/

router.post('/', async (req, res, next) => {
  try {
    //check if product exists
    const productData = await Product.findById(req.body.productId)
    if (!productData){
      throw new Error('product of specified id does not exist')
    }

    console.log('req.session.cart is', req.session.cart)
    //if not a user
    if (!req.user){
      //create a cartItemObject
      const cartItemObject = {
        productId: req.body.productId,
        quantity: req.body.quantity,
        product: productData,
      }

      console.log('req.session.cart is', req.session.cart)
      //find index of the cart in our session
      const itemIdx = req.session.cart.findIndex((item) => {
        return item.id === req.body.productId
      })

      //update or create cartItemObject in our session array
      if (itemIdx !== -1){
        req.session.cart[itemIdx] = cartItemObject
      } else {
        req.session.cart.push(cartItemObject)
      }

      res.set(201).json(req.session.cart)

    } else {
      console.log('is user, getting cart from database')
      await CartItem.upsert(
        {
          userId: req.user.id,
          productId: req.body.productId,
          quantity: req.body.quantity
        }
      )
      const cartItems = await getCart(req.user.id)
      req.session.cart = cartItems
      res.set(200).json(cartItems)
    }
  } catch (error){
    next(error)
  }
})

/*
DELETE: /api/cart/
deletes a specified product in a cart

example req.body is:
  {
    productId : 3,
  }
*/
router.delete('/', async (req, res, next) => {
  try {
    //check if product exists
    const productData = await Product.findById(req.body.productId)
    if (!productData){
      throw new Error('product of specified id does not exist')
    }

    //if not a user
    if (!req.user){
      //find index of the cart in our session
      const itemIdx = req.session.cart.findIndex((item) => {
        return item.id === req.body.productId
      })

      //remove the item from the array(mutating method)
      req.session.cart.splice(itemIdx, 1)

      //return the cart session
      res.set(201).json(req.session.cart)
    } else {

      await CartItem.destroy({
        where: {
          userId: req.body.userId,
          productId: req.body.productId,
        }
      })
      const cartItems = await getCart(req.user.id)

      req.session.cart = cartItems
      res.set(201).json(cartItems)
    }
  } catch (error){
    next(error)
  }
})

module.exports = router
