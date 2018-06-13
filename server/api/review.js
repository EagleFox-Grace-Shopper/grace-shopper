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

router.post('/:productId', async (req,res,next) => {
  if(!req.user){
    throw new Error('User is not logged in')
  }
  const reviewData = await Review.findOne(
    {
      where: {
        userId: req.user.id,
        productId: req.params.productId,
      }
    }
  )

  const reviewDataId = reviewData ?
    reviewData.dataValues.id :
    undefined

  Review.upsert(
    {
      id:          reviewDataId,
      userId:      req.user.id,
      productId:   req.params.productId,
      title:       req.body.title,
      rating:      req.body.rating,
      description: req.body.description
    }
  )
})

module.exports = router
