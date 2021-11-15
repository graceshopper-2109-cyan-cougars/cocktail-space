const router = require('express').Router()
const { models: { Drink }} = require('../db')
module.exports = router


//Fetching All Drinks in /api/drinks
router.get('/', async (req, res, next) => {
  try {
    const drinksResults = await Drink.findAll()
    res.json(drinksResults);
  } catch (err) {
    next(err)
  }
})

//Fetching One Drink in example => /api/drinks/1
router.get('/:id', async (req, res, next) => {
  try {
    const singleDrink = await Drink.findByPk(req.params.id)
    res.json(singleDrink)
  } catch (err) {
    next(err)
  }
})

// Deleting One Drink By ID

router.delete('/:id', async (req, res, next) => {
  try {
    const drink = await Drink.findByPk(req.params.id)
    await drink.destroy();
    res.send(drink)
  } catch (err) {
    next(err)
  }
})

// Create New Drink Using Form Data
router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await Drink.create(req.body))
  } catch (err) {
    next(err)
  }
})
