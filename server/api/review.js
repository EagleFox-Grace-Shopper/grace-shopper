const express = require('express')
const router = express.Router()
const { Review } = require('../db/models')

router.get('/:productId', async (req, res, next) => {
  const productReviews = await Review.findAll({
    where: {
      productId: req.params.productId,
    }
  })
  res.status(201).send(productReviews)
})

router.get('/:productId/user/', async (req, res, next) => {
  if(!req.user){
    throw new Error('User is not logged in')
  }
  const productReviews = await Review.findOne({
    where: {
      productId: req.params.productId,
      userId: req.user.id,
    }
  })
  res.status(201).send(productReviews)
})
module.exports = router
