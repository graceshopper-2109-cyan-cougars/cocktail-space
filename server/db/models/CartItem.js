const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');

const CartItem = db.define('cartItem', {
  quantity: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 1,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },
});

module.exports = CartItem;
