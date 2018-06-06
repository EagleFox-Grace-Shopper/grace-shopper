const Sequelize = require('sequelize')
const db = require('../db')

const CartItems = db.define('cartItems', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
  }
)

module.exports = CartItems
