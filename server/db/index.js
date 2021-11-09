//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Drink = require("./models/Drink");
const Cart = require("./models/Cart");

//associations could go here!
Cart.belongsTo(User);

Cart.belongsToMany(Drink, { through: "cart_drink" });
Drink.belongsToMany(Cart, { through: "cart_drink" });

module.exports = {
  db,
  models: {
    User,
    Drink,
    Cart,
  },
};
