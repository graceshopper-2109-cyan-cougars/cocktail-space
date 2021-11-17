<<<<<<< HEAD
const router = require('express').Router()
const { models: { Drink }} = require('../db')
const { requireToken, isAdmin } = require('./gatekeeper')

module.exports = router

=======
const router = require('express').Router();
const {
  models: { Drink },
} = require('../db');
module.exports = router;
>>>>>>> main

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
<<<<<<< HEAD
})

// Deals with post request, only allow posting for login admins
router.post('/',requireToken, isAdmin, async (req, res, next) => {
  try {
    res.status(201).json(await Drink.create(req.body));
  } catch (error) {
    next(error);
  }
});


// Deals with delete request, only allow delete for login admins
router.delete('/:id',requireToken, isAdmin, async (req, res, next) => {
  try {
    const singleDrink = await Drink.findByPk(req.params.id)
    await singleDrink.destroy();
    res.send(singleDrink)
  } catch (error) {
    next(error)
  }
})
=======
});
>>>>>>> main
