const User = require('./user')
const Category = require('./category')
const Product = require('./product')

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
//Cart.hasMany(Product)
//Product.belongsToMany(Cart)


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
}
