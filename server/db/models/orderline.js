const Sequelize = require('sequelize')
const db = require('../db')

const OrderLine = db.define('orderline', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  qtyPurchased: {
    type: Sequelize.STRING
  }
})

module.exports = OrderLine

