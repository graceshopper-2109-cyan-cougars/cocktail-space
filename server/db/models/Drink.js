const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Drink = db.define("drink", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  baseLiquor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  alcoholContent: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    // defaultValue:
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Drink;
