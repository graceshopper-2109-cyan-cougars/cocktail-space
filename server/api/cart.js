const router = require("express").Router();
const Cart = require("../db/models/Cart");
const User = require("../db/models/User");

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user != null) {
      const cartItems = await user.getCartI();

      res.send(cartItems);
    } else {
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
