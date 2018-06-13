const express = require('express')
const router = express.Router()
const { CartItem, Product, Order, OrderLine } = require('../db/models')
const configureStripe = require('stripe')
const { STRIPE_SECRET_KEY, MAILER_AUTH } = require('../../secrets')
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || STRIPE_SECRET_KEY
const MAILER_AUTHENTICATION = {
  user: process.env.MAILER_USER || MAILER_AUTH.user,
  pass: process.env.MAILER_PASSWORD || MAILER_AUTH.pass
}

const stripe = configureStripe(STRIPE_SECRET)
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: MAILER_AUTHENTICATION
})

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

    const cartItemQuantity = cartItemData ?
      cartItemData.dataValues.quantity + req.body.quantity :
      req.body.quantity

    //upserts data into database by adding the quantity
    await CartItem.upsert(
      {
        id: cartItemId,
        userId: req.user.id,
        productId: req.body.productId,
        quantity: cartItemQuantity,
      }
    )

    const cartItems = await getCart(req.user.id)
    req.session.cart = cartItems
  }
  res.status(201).json(req.session.cart)
})

/*
PUT: /api/cart/merge
adds all the items in the 'session cart' to the 'database cart'
when logging in
*/
router.put('/merge', async (req, res, next) => {
  //make sure the user is logged in before migrating
  if (!req.user) {
    throw new Error('user must be logged in to merge item to cart')
  }

  await Promise.all(req.session.cart.map(async (cartItem) => {
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
      cartItemData.dataValues.quantity + cartItem.quantity :
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
  }))


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

const buildOrder = async (req) => {
  const orderInfo = req.body
  const userId = req.user ? req.user.id : null
  const email = orderInfo.email
  const totalAmount = orderInfo.stripe.amount
  const tokenId = orderInfo.stripe.source
  const shipping = {
    name: orderInfo.name,
    shippingAddress: orderInfo.shipAddress,
    shippingCity: orderInfo.shipCity,
    shippingState: orderInfo.shipState,
    shippingZip: orderInfo.shipZip,
  }
  const billing = {
    billingName: orderInfo.billName,
    billingAddress: orderInfo.billAddress,
    billingCity: orderInfo.billCity,
    billingState: orderInfo.billState,
    billingZip: orderInfo.billZip,
  }

  const orderRes = await Order.create({
    userId,
    email,
    totalAmount,
    tokenId,
    ...shipping,
    ...billing,
  })
  await Promise.all(req.session.cart.map((item) => {
    return OrderLine.create({
      orderId: orderRes.dataValues.id,
      qtyPurchased: item.quantity,
      productId: item.product.id,
      title: item.product.title,
      description: item.product.description,
      price: item.product.price,
      imageUrl: item.product.imageUrl,
    })
  }))
  return orderRes.dataValues
}

const sendConfirmationEmail = (email, orderId) => {
  const mailOptions = {
    from: 'eaglefoxshopper@gmail.com',
    to: email,
    subject: `EagleFox Shopper Order Complete - ${orderId}`,
    html: '<p>Order complete</p>'
  }
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) { console.log(err) }
    else { console.log(info) }
  })
}

router.post('/checkout', async (req, res, next) => {
  const chargeOutput = await stripe.charges.create(req.body.stripe)
  const order = await buildOrder(req, chargeOutput)
  req.session.cart.forEach(item => {
    clearCartItem(req, item.productId)
  })
  const cart = await getCart()
  sendConfirmationEmail(req.body.email, order.id)
  res.status(201).json({ cart, order })
})

module.exports = router
