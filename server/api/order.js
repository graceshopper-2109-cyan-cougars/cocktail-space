const router = require('express').Router();
const {
  models: { Order, CartItem, User },
} = require('../db/index');

// find the user corresponding to the token, and return the items in that user's single active order ( the user's cart )
router.get('/', async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.headers.token);
    let cart = await Order.findOne({ where: { userId: id, active: true } });
    if (!cart) {
      cart = await Order.create({ userId: id });
    }
    const drinks = await CartItem.findAll({ where: { orderId: cart.id } });
    res.send(drinks);
  } catch (e) {
    next(e);
  }
});

// find the user corresponding to the token, and add an item to their single active order ( the user's cart )
router.post('/', async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.headers.token);
    let cart = await Order.findOne({ where: { userId: id, active: true } });
    if (!cart) {
      cart = await Order.create({ userId: id });
    }
    const newItem = await CartItem.create({ ...req.body, orderId: cart.id });
    res.send(newItem);
  } catch (e) {
    next(e);
  }
});

router.post('/checkout', async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.headers.token);
    const cart = await Order.findOne({ where: { userId: id, active: true } });
    cart.update({ active: false });
    res.send([]);
  } catch (e) {
    next(e);
  }
});

// find the cartItem to update with the passed in orderId, update accordingly
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
