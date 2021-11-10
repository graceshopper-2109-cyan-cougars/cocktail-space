const router = require('express').Router();
const { Order, CartItem, User } = require('../db/index');

// find the user corresponding to the token, and return the items in that user's single active order ( the user's cart )
router.get('/', async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.headers);
    const cart = await Order.findOne({ where: { userId: id, active: true } });
    if (!cart) {
      return next();
    } else {
      const drinks = await CartItem.findAll({ where: { orderId: cart.id } });
      res.send(drinks);
    }
  } catch (e) {
    next(e);
  }
});

// find the user corresponding to the token, and add an item to their single active order ( the user's cart )
router.post('/', async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.headers);
    let cart = await Order.findOne({ where: { userId: id, active: true } });
    // if the user doesn't have an active cart, create a new empty cart
    if (!cart) {
      cart = await Order.create({ userId: id });
    }
    const newItem = await CartItem.create({ ...req.body, orderId: cart.id });
    res.send(newItem);
  } catch (e) {
    next(e);
  }
});

// find the cartItem to update with the passed in id, update accordingly
router.put('/:id', async (req, res, next) => {
  try {
    const itemToUpdate = await CartItem.findOne({
      where: { id: req.params.id },
    });
    const { qty } = req.body;
    itemToUpdate.update({ quantity: qty });
    res.send(itemToUpdate);
  } catch (e) {
    next(e);
  }
});

// find the cartItem to delete with the passed in id, and delete
router.delete('/:id', async (req, res, next) => {
  try {
    const itemToDelete = await CartItem.findOne({
      where: { id: req.params.id },
    });
    await itemToDelete.destroy();
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
