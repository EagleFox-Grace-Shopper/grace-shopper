const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  totalAmount: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  orderEmail: {
    type: Sequelize.STRING
  },
  tokenId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shippingCity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shippingState: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shippingZip: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billingName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billingAddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billingCity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billingState: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billingZip: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

module.exports = Orders

