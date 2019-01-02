module.exports = {
  admin(req, res, next) {
    if(req.user) {
      next();
    }
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }
}
