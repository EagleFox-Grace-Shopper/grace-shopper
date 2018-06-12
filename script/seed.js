'use strict'

const db = require('../server/db')
const { User, Product, Category, CartItem, Order, OrderLine, Review} = require('../server/db/models')


async function seed () {
  await db.sync({ force: true })
  console.log('db synced!')

  const users = await Promise.all([
    User.create({ name: 'Chan', email: 'chan@email.com', password: '123', address: '123 Main Street, Chicago, IL 94597', isAdmin: true }),
    User.create({ name: 'Andrew Trahan', email: 'andrew@email.com', password: '12345', address: '123 Wicker Street, Chicago, IL 94597', isAdmin: true }),
    User.create({ name: 'Homum Ahsan', email: 'homum@email.com', password: 'supersmash64', address: '123 Division Street, Chicago, IL 60647', isAdmin: true }),
    User.create({ name: 'Justin H', email: 'justin@email.com', password: 'puppies123', address: '3006 W Fullerton Ave, Chicago, IL 60647', isAdmin: true }),
    User.create({ name: 'Cody', email: 'cody@email.com', password: '1', address: '1 Puppy Prison Dr, Chicago, IL 60647' }),
  ])

  const [wacky, food, clothing, kitchen] = await Promise.all([
    Category.create({ name: 'wacky' }),
    Category.create({ name: 'food' }),
    Category.create({ name: 'clothing' }),
    Category.create({ name: 'kitchen' }),
  ])

  const [crocksocks, grillba, licki, sauna, dunker, mug, nightstand, tube, lettuce, handitaur] = await Promise.all([
    Product.create({
      title: 'Crocs with socks',
      description: 'These crocs have built in socks!',
      price: 19.99,
      quantity: 43,
      imageUrl: 'https://i.redd.it/nyjqg5zjas111.png'
    }),
    Product.create({
      title: 'Grillba',
      description: 'Roomba for your grill',
      price: 49.99,
      quantity: 87,
      imageUrl: 'https://i.redd.it/287mfbuf7x111.gif'
    }),
    Product.create({
      title: 'Licki Brush',
      description: 'Lick your cat!',
      price: 15.99,
      quantity: 62,
      imageUrl: 'https://i.redd.it/orqpr3q0vl111.jpg'
    }),
    Product.create({
      title: 'Rejuvenator Portable Sauna',
      description: 'The finest airline experience possible',
      price: 149.99,
      quantity: 22,
      imageUrl: 'https://i.imgur.com/FZkpsst.jpg'
    }),
    Product.create({
      title: 'Magnetic Cookie Dunker',
      description: 'One step closer to a world without war',
      price: 9.99,
      quantity: 103,
      imageUrl: 'http://i.imgur.com/FQR4nrT.jpg?1'
    }),
    Product.create({
      title: 'The Floating Mug',
      description: 'No more coasters!',
      price: 9.99,
      quantity: 149,
      imageUrl: 'https://tinyurl.com/ybs3ydxr'
    }),
    Product.create({
      title: 'Bat and Shield Night Stand',
      description: 'Night stand that turns into a bat and shield',
      price: 59.99,
      quantity: 52,
      imageUrl: 'https://i.redd.it/12sxmkwqovr01.jpg'
    }),
    Product.create({
      title: 'Experience Tube',
      description: 'Never be distracted by your phone again',
      price: 29.99,
      quantity: 89,
      imageUrl: 'https://i.redd.it/0u0xt3ymumzz.jpg'
    }),
    Product.create({
      title: 'Lettuce Umbrella',
      description: 'An umbrella that looks like lettuce.  (Not edible)',
      price: 24.99,
      quantity: 12,
      imageUrl: 'https://i.redd.it/ck0u2asgcvw01.jpg'
    }),
    Product.create({
      title: 'Handitaur',
      description: 'A centaur for your hand',
      price: 12.99,
      quantity: 40,
      imageUrl: 'https://i.redd.it/ja8qovp7qukz.jpg'
    }),
  ])

  const productCategoryData = [
    { productId: crocksocks.id, categoryId: clothing.id },
    { productId: crocksocks.id, categoryId: wacky.id },
    { productId: grillba.id, categoryId: kitchen.id },
    { productId: licki.id, categoryId: clothing.id },
    { productId: licki.id, categoryId: wacky.id },
    { productId: sauna.id, categoryId: wacky.id },
    { productId: dunker.id, categoryId: kitchen.id },
    { productId: dunker.id, categoryId: food.id },
    { productId: mug.id, categoryId: kitchen.id },
    { productId: mug.id, categoryId: food.id },
    { productId: nightstand.id, categoryId: wacky.id },
    { productId: tube.id, categoryId: wacky.id },
    { productId: lettuce.id, categoryId: wacky.id },
    { productId: lettuce.id, categoryId: food.id },
    { productId: handitaur.id, categoryId: wacky.id },
    { productId: handitaur.id, categoryId: clothing.id },
  ]
  await db.models.productCategory.bulkCreate(productCategoryData)

  const cartItemsData = [
    { userId: 1, productId: crocksocks.id, quantity: 2},
    { userId: 1, productId: grillba.id, quantity: 4},
    { userId: 1, productId: licki.id, quantity: 5},
    { userId: 2, productId: crocksocks.id, quantity: 2},
  ]

  await CartItem.bulkCreate(cartItemsData)

  const reviewsData = [
    { userId: users[0].id, rating: 5, productId: crocksocks.id, title: 'warm', description: 'keeps my feet warm'},
    { userId: users[0].id, rating: 4, productId: sauna.id, title: 'indespensible', description: 'So useful, I use it all the time when I travel'},
    { userId: users[0].id, rating: 4, productId: mug.id, title: 'coast', description: 'who needs coasters?'},
    { userId: users[2].id, rating: 2, productId: crocksocks.id, title: 'only long socks', description: 'they dont make these with ankle socks, so I had to roll them down'},
    { userId: users[2].id, rating: 1, productId: nightstand.id, title: 'be careful', description: 'Accidentally sent my husband to the hospital'},
    { userId: users[2].id, rating: 4, productId: mug.id, title: 'excellent gift', description: 'bought one for my mom and she loves it'},
  ]

  await Review.bulkCreate(reviewsData)

  await Promise.all([
    Order.create({ totalAmount: 19.99, email: 'chan@email.com', userId: 1}),
    Order.create({ totalAmount: 29.99, email: 'chan@email.com', userId: 1}),
    Order.create({ totalAmount: 39.99, email: 'chan@email.com', userId: 1}),
    Order.create({ totalAmount: 49.99, email: 'chan@email.com', userId: 1}),
    Order.create({ totalAmount: 200, email: 'andrew@email.com'}),
    Order.create({ totalAmount: 300, email: 'homum@email.com'}),
    Order.create({ totalAmount: 400, email: 'justin@email.com'}),
    Order.create({ totalAmount: 500, email: 'cody@email.com'}),
  ])

  await Promise.all([
    OrderLine.create({ productId: 1, title: 'Crocs with socks', description: 'Roomba for your grill', price: 19.99, imageUrl: 'https://i.redd.it/nyjqg5zjas111.png', qtyPurchased: 1, orderId: 1}),
    OrderLine.create({ productId: 2, title: 'Grillba', description: 'These crocs have built in socks!', price: 49.99, imageUrl: 'https://i.redd.it/287mfbuf7x111.gif', qtyPurchased: 1, orderId: 1})
  ])

  console.log(`seeded ${users.length} users`)
  // console.log(`seeded ${products.length} products and ${categories.length} categories`)
  console.log('seeded successfully')
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  seed()
    .catch(err => {
      console.error(err)
      process.exitCode = 1
    })
    .then(() => {
      console.log('closing db connection')
      db.close()
      console.log('db connection closed')
    })

  console.log('seeding...')
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
