module.exports = {
  admin(req, res, next) {
    const { authorize } = req.user;
    if(authorize >= 1) {
      next();
    }
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }
}
