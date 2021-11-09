const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Cart = db.define("cart", {
  drinkID: {
    type: Sequelize.STRING,
    allowNull: false,
    primarykey: true
  },

});

module.exports = Cart;
