'use strict';

const {
  db,
  models: { User, Drink, Order, CartItem },
} = require('../server/db');

const seedDrinks = [
  {
    name: 'Dumbo Manhattan',
    baseLiquor: 'Bourbon',
    price: 1999,
    alcoholContent: 80,
    image: 'Content/dumbomanhattan.jpeg',
    stock: 15,
    description:
      'Our take on the classic manhattan, made locally from our storefront in Dumbo.',
  },
  {
    name: 'Tequila Sunset',
    baseLiquor: 'Tequila',
    price: 1599,
    alcoholContent: 80,
    image: 'Content/tequilasunset.jpeg',
    stock: 10,
    description:
      'With orange juice, Tequila, and blackberry brandy, it’s easy on your palate and enjoyable any time of day.',
  },
  {
    name: 'Watermelon Daiquiri',
    baseLiquor: 'Rum',
    price: 1599,
    alcoholContent: 80,
    image: 'Content/watermelondaquari.jpeg',
    stock: 15,
    description:
      'Preparing fresh watermelon juice gives this blend-and-sip cocktail a burst of cool melon flavor.',
  },
  {
    name: 'Orange Martini',
    baseLiquor: 'Vodka',
    price: 1799,
    alcoholContent: 80,
    image: 'Content/orangemartini.jpeg',
    stock: 20,
    description:
      'The perfect easy Orange Martini is made with vodka, triple sec, and freshly squeezed orange juice with oranges from the orange groves of Florida!',
  },
  {
    name: 'Espresso Martini',
    baseLiquor: 'Vodka',
    price: 1399,
    alcoholContent: 80,
    image: 'Content/espressomartini.jpeg',
    stock: 20,
    description:
      'Our espresso martini is a cold, coffee-flavored cocktail made with vodka, espresso coffee, and coffee liqueur.',
  },
  {
    name: 'Berry Mojito',
    baseLiquor: 'Rum',
    price: 1499,
    alcoholContent: 80,
    image: 'Content/berrymojito.jpeg',
    stock: 15,
    description:
      'This mixed berry mojito combines delicious raspberries, blackberries, mint, and rum. It is one of our best sellers!',
  },
  {
    name: 'Rhubarb Perfection',
    baseLiquor: 'Bourbon',
    price: 1899,
    alcoholContent: 80,
    image: 'Content/rhubarbperfection.jpeg',
    stock: 15,
    description:
      'This Rhubarb Bourbon Sour Cocktail recipe with a honey rhubarb simple syrup is a refreshing and seasonal take on the classic drink.',
  },
  {
    name: 'Mezcal Old Fashioned',
    baseLiquor: 'Tequila',
    price: 1899,
    alcoholContent: 80,
    image: 'Content/mezcaloldfashioned.jpeg',
    stock: 25,
    description:
      'The Mezcal Old Fashioned, also called the Oaxaca Old Fashioned is a smoky agave version of the classic Old Fashioned Cocktail.',
  },
  // {
  //   name: ,
  //   baseLiquor: ,
  //   price: ,
  //   alcoholContent: 80,
  //   image: ,
  //   stock: ,
  //   description: 'blah blah blah'
  // },
];

const seedUsers = [
  {
    id: 1,
    username: 'fettuccine@gmail.com',
    password: 'imhungry',
    firstName: 'Fettuccine',
    lastName: 'Alfredo',
    isAdmin: true,
  },
  {
    id: 2,
    username: 'risotto@gmail.com',
    password: 'imhungry',
    firstName: 'Mushroom',
    lastName: 'Risotto',
    isAdmin: false,
  },
  {
    id: 3,
    username: 'tortelloni@gmail.com',
    password: 'imhungry',
    firstName: 'Tortelloni',
    lastName: 'Pesto',
    isAdmin: false,
  },
];

const seedOrders = [{ active: true }, { active: true }];

const seedCartItems = [{ quantity: 1 }, { quantity: 2 }, { quantity: 1 }];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Seeding Users
  await Promise.all(
    seedUsers.map((user) => {
      return User.create(user);
    })
  );

  // Seeding Drinks
  await Promise.all(
    seedDrinks.map((drink) => {
      return Drink.create(drink);
    })
  );

  // seeding orders
  await Promise.all(
    seedOrders.map((order) => {
      return Order.create(order);
    })
  );

  // seeding cartItems
  await Promise.all(
    seedCartItems.map((cartItem) => {
      return CartItem.create(cartItem);
    })
  );

  // setting relations for orders, cartitems, and users
  const user1 = await User.findByPk(1);
  const user2 = await User.findByPk(2);

  const order1 = await Order.findByPk(1);
  const order2 = await Order.findByPk(2);

  await order1.setUser(user1);
  await order2.setUser(user2);

  const cartItem1 = await CartItem.findByPk(1);
  const cartItem2 = await CartItem.findByPk(2);
  const cartItem3 = await CartItem.findByPk(3);

  await order1.setCartItems([cartItem1, cartItem2]);
  await order2.setCartItems([cartItem3]);

  await cartItem1.setDrink(await Drink.findByPk(1));
  await cartItem2.setDrink(await Drink.findByPk(2));
  await cartItem3.setDrink(await Drink.findByPk(4));

  db.close();
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
