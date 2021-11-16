const {models: { User }} = require('../db')


const requireToken = async(req, rest, next) => {
  try {
    const token = req.headers.authorization
    const user = await User.findByToken(token)
    req.user = user
    next()
  } catch (e) {
    next(e)
  }
}

const isAdmin = (req, res, next) =>{
  if(!req.user.isAdmin) {
    return res.status(403).send('Hello, not here')
  }else {
     next()
  }
}

module.exports = {
  requireToken,
  isAdmin
}
