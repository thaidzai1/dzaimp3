const mongoose = require('mongoose');
const fs = require('fs');
const util = require('util');
const path = require('path');

module.exports = {
    async seedDB() {
        let Singer  = mongoose.model('singers'),
            Album   = mongoose.model('albums'),
            Song    = mongoose.model('songs'),
            Test    = mongoose.model('tests');
        let execute = true;
        for(let model of [Singer, Album, Song]) {
            if(await model.countDocuments() > 0) {
                execute = false;
            }
        }
        let readFile = util.promisify(fs.readFile);
        if(execute) {
            let singer = await readFile(path.resolve(__dirname, "data", "singer.json"), "utf8");
            let album = await readFile(path.resolve(__dirname, "data", "album.json"), "utf8");
            let song = await readFile(path.resolve(__dirname, "data", "song.json"), "utf8");
            let dataSinger = JSON.parse(singer);
            let dataAlbum = JSON.parse(album);
            let dataSong = JSON.parse(song);
            let savedSinger = await Singer.create(dataSinger);
            dataSinger = dataSinger.map((singer, index) => ({...singer, _id: savedSinger[index]._id}));
            dataAlbum = dataAlbum.map(album => {
                dataSinger.map(singer => {
                    if(album.singer_id === singer.id) {
                        album = {...album, singer_id: singer._id};
                    }
                });
                return album;
            });
            let savedAlbum = await Album.create(dataAlbum);
            dataAlbum = dataAlbum.map((album, index) => ({...album, _id: savedAlbum[index]._id}));

            dataSong = dataSong.map(song => {
                dataAlbum.map(album => {
                    if(song.album_id === album.id) {
                        song = {...song, album_id: album._id, singer_id: album.singer_id};
                    }
                })
                return song;
            })
            await Song.create(dataSong);
        }
    }
}