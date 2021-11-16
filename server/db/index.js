//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Drink = require('./models/Drink');
const Order = require('./models/Order');
const CartItem = require('./models/CartItem');

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(CartItem);
CartItem.belongsTo(Order);

Drink.hasMany(CartItem);
CartItem.belongsTo(Drink);

/*
  orderId  drinkId  quantity
  1        1        1
  1        2        2
  1        3        2


id  orderId  drinkId
1   1        1
2   1        2
3   1        1
*/
module.exports = {
  db,
  models: {
    User,
    Drink,
    CartItem,
    Order,
  },
};
