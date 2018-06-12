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

module.exports = router
