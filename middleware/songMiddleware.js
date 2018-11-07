//song middleware
module.exports = {
  validateSong(req, res, next) {
    const { songName, singer, poster, audio } = req.body;

    console.log(req.body);

    if(songName === '') {
      return res.status(412).json({status: false, message: "song's name is required"})
    }
    if(singer === '') {
      return res.status(412).json({status: false, message: "song's singer is required"});
    }
    if(poster === '') {
      return res.status(412).json({status: false, message: "song's poster is required"});
    }
    if(audio === '') {
      return res.status(412).json({status: false, message: "song's audio is required"});
    }
    next();
  }
}
