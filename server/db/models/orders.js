const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  totalAmount: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
})

module.exports = Orders

