const router = require('express').Router();
const mongoose = require('mongoose');

const singerMiddleware = require('../../middleware/singerMiddleware');
const Singer = mongoose.model('singers');

router.get('/singer', async (req, res) => {
  let singer = await Singer.aggregate([
    {$sort: {name: 1}}
  ]);

  return res.status(200).json(singer);
})

router.post('/singer', singerMiddleware.createUser, async (req, res) => {
  const { name, nationality } = req.body;
  let singer;
  try{
    singer = await new Singer({name, nationality}).save();
    return res.status(200).json(singer);
  }
  catch(err) {
    return res.status(400).json(err.message);
  }
})

module.exports = router;
