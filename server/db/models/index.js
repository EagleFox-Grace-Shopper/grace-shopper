const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const CartItem = require('./cart-item')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Product.belongsToMany(Category, {through: 'productCategory'})
Category.belongsToMany(Product, {through: 'productCategory'})

//Potential future routes
//Review.belongsToMany(Product)
//Product.hasMany(Review)
//User.hasOne(Cart)
//Cart.belongsTo(User)

User.hasMany(CartItem)
CartItem.belongsTo(User)
CartItem.belongsTo(Product)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
*/

module.exports = {
  User,
  Product,
  Category,
  CartItem,
}
