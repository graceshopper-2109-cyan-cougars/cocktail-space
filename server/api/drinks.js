const router = require('express').Router();
const {
  models: { Drink },
} = require('../db');
module.exports = router;

//Fetching All Drinks in /api/drinks
router.get('/', async (req, res, next) => {
  try {
    const drinksResults = await Drink.findAll();
    res.json(drinksResults);
  } catch (err) {
    next(err);
  }
});

//Fetching One Drink in example => /api/drinks/1
router.get('/:id', async (req, res, next) => {
  try {
    const singleDrink = await Drink.findByPk(req.params.id);
    res.json(singleDrink);
  } catch (err) {
    next(err);
  }
});
