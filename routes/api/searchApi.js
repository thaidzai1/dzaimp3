const router = require('express').Router();
const mongoose = require('mongoose');

const Song = mongoose.model('songs');
const Singer = mongoose.model('singers');
const Album = mongoose.model('albums');

router.get('/search/:keyword', async (req, res) => {
    const { keyword } = req.params;
    console.log(keyword);
    let songs = await Song.find({songName: {$regex: `${keyword}`, $options: "i"}});
    let albums = await Album.find({name: {$regex: `${keyword}`, $options: "i"}});

    let result = {songs, albums};
    return res.status(200).json(result);
})

module.exports = router;