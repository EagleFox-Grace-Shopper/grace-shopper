const express = require('express')
const router = express.Router()
const { CartItem, Product, Order, OrderLine } = require('../db/models')

//this sets up the cart if one does not exist.
router.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  next()
})

const getCart = async (id) => {
//access the cart from the db
  const cartItems = await CartItem.findAll({
    where: {
      userId: id,
    },
    include: [{
      model: Product,
    }]
  })
  return cartItems
}

/*
GET: /api/cart/
returns the cart
*/
router.get('/', async (req, res, next) => {
  if (!req.user) {
    res.json(req.session.cart)
  } else {
    const cartItems = await getCart(req.user.id)
    res.status(201).json(cartItems)
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
//check if product exists
  const productData = await Product.findById(req.body.productId)
  if (!productData) {
    throw new Error('product of specified id does not exist')
  }

  //if not a user
  if (!req.user) {
  //create a cartItemObject
    const cartItemObject = {
      productId: req.body.productId,
      quantity: req.body.quantity,
      product: productData,
    }

    //find index of the cart in our session
    const itemIdx = req.session.cart.findIndex((item) => {
      return item.productId === req.body.productId
    })

    //update or create cartItemObject in our session array
    if (itemIdx !== -1) {
      req.session.cart[itemIdx].quantity = cartItemObject.quantity
    } else {
      req.session.cart.push(cartItemObject)
    }

    res.status(201).json(req.session.cart)

  } else {

  //get the cartItemData, to get its id for use as the unique key
    const cartItemData = await CartItem.findOne({
      where: {
        userId: req.user.id,
        productId: req.body.productId
      }
    })

    //assign id if found or undefined if notFound
    const cartItemId = cartItemData ?
      cartItemData.dataValues.id :
      undefined

    //upserts data into database
    await CartItem.upsert(
      {
        id: cartItemId,
        userId: req.user.id,
        productId: req.body.productId,
        quantity: req.body.quantity,
      }
    )

    const cartItems = await getCart(req.user.id)
    req.session.cart = cartItems
    res.status(201).json(cartItems)
  }
})

/*
POST: /api/cart/add
adds the product of a specified quantity to the cart.

example req.body is:
{
  productId : 3,
  quantity : 1,
}
*/

router.post('/add', async (req, res, next) => {
//check if product exists
  const productData = await Product.findById(req.body.productId)
  if (!productData) {
    throw new Error('product of specified id does not exist')
  }

  //if not a user
  if (!req.user) {

  //find index of the cart in our session
    const itemIdx = req.session.cart.findIndex((item) => {
      return item.productId === req.body.productId
    })

    //update or create cartItemObject in our session array
    if (itemIdx !== -1) {
    //if the instance of the product exists:
      //adds the quantity to the existing quantity
      req.session.cart[itemIdx].quantity += req.body.quantity
    } else {
    //push the new cart object into the session
      req.session.cart.push({
        productId: req.body.productId,
        quantity: req.body.quantity,
        product: productData,
      })
    }

    res.status(201).json(req.session.cart)

  } else {
  //if this is a user

    //get the cartItemData, to get its id for use as the unique key
    const cartItemData = await CartItem.findOne({
      where: {
        userId: req.user.id,
        productId: req.body.productId
      }
    })

    //assign id if found or undefined if notFound
    const cartItemId = cartItemData ?
      cartItemData.dataValues.id :
      undefined

    //upserts data into database by adding the quantity
    await CartItem.upsert(
      {
        id: cartItemId,
        userId: req.user.id,
        productId: req.body.productId,
        quantity: cartItemData.quantity + req.body.quantity,
      }
    )

    const cartItems = await getCart(req.user.id)
    req.session.cart = cartItems
    res.status(201).json(cartItems)
  }
})

/*
PUT: /api/cart/merge
adds all the items in the 'session cart' to the 'database cart'
when logging in
*/
router.put('/merge', async (req, res, next) => {
//make sure the user is logged in before migrating
  if (!req.user) {
    throw new Error('user must be logged in to add item to cart')
  }
  req.session.cart.map(async (cartItem) => {
    //get the cartItemData, to get its id for use as the unique key
    const cartItemData = await CartItem.findOne({
      where: {
        userId: req.user.id,
        productId: cartItem.productId
      }
    })

    //assign id if found or undefined if notFound
    const cartItemId = cartItemData ?
      cartItemData.dataValues.id :
      undefined


    const cartItemQuantity = cartItemData ?
      cartItemData.quantity + cartItem.quantity :
      cartItem.quantity

    //adds cartItem
    await CartItem.upsert(
      {
        id: cartItemId,
        userId: req.user.id,
        productId: cartItem.productId,
        quantity: cartItemQuantity,
      }
    )
  })

  req.session.cart = await getCart(req.user.id)
  res.status(201).json(req.session.cart)
})

/*
DELETE: /api/cart/
deletes a specified product in a cart

example req.body is:
  {
    productId : 3,
  }
*/

async function clearCartItem(req, productId) {
  //if not a user
  if (!req.user) {
    //find index of the cart in our session
    const itemIdx = req.session.cart.findIndex((item) => {
      return item.productId === productId
    })
    //remove the item from the array(mutating method)
    req.session.cart.splice(itemIdx, 1)
  } else {
    await CartItem.destroy({
      where: {
        userId: req.user.id,
        productId,
      }
    })
    const cartItems = await getCart(req.user.id)
    req.session.cart = cartItems
  }
  return req.session.cart
}

router.delete('/:productId', async (req, res, next) => {
  //check if product exists
  const productData = await Product.findById(req.params.productId)
  if (!productData) {
    throw new Error('product of specified id does not exist')
  }
  const curCart = await clearCartItem(req, req.params.productId)
  res.status(201).json(curCart)
})

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
    clearCartItem(req, item.id)
  })
  const cart = await getCart()
  res.setStatus(201).json({ cart, orderInfo })
})

module.exports = router
