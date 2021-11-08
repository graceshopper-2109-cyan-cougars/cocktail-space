//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Drink = require("/models/Drink");
const Cart = require("/models/Cart");

//associations could go here!
User.belongsToOne(Cart);
Cart.belongsToOne(User);

module.exports = {
  db,
  models: {
    User,
    Drink,
    Cart,
  },
};
