module.exports = {
  async createAlbum(req, res, next) {
    for(let prop in req.body) {
      if(req.body[prop] === undefined) {
        return res.status(400).json({
          message: `${prop} field is undefined`
        })
      }
      if(req.body[prop] === '') {
        return res.status(400).json({
          message: `${prop} field is required`
        })
      }
    }
    next();
  }
}
