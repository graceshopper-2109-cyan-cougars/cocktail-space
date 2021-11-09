const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Cart = db.define("cart", {
  quantity: { type: Sequelize.INTEGER, allowNull: false },
  price: { type: Sequelize.FLOAT, allowNull: false },
});

module.exports = Cart;
