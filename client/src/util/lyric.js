module.exports = (song) => {
    var firstLyric = document.getElementsByClassName('first-lyric');
    var secondLyric = document.getElementsByClassName('second-lyric');
    var karaEffect = document.getElementsByClassName('lyric-kara-effect');

    console.log(firstLyric);
    console.log(secondLyric);
    console.log(karaEffect);
    console.log(song);

    let syncData = song.lyric;
    let audioPlayer = song.audio;
    let updatedLyric = { start: 0, end: 0};

    audioPlayer.addEventListener('timeupdate', function(e) {
        syncData.forEach(function(element, index, array) {
            if(audioPlayer.currentTime >= element.start && audioPlayer.currentTime <= element.end) {
                if(updatedLyric.start >= audioPlayer.currentTime || updatedLyric.end <= audioPlayer.currentTime) {
                    if(index % 2 === 0) {
                        console.log(index);
                        if(index === 0) {
                            firstLyric[0].childNodes[0].data = `${syncData[index].text}`;
                            karaEffect[0].innerHTML = syncData[index].text;
                        }

                        karaEffect[1].innerHTML = syncData[index + 1].text;

                        secondLyric[0].childNodes[0].data = `${syncData[index + 1].text}`;

                        karaEffect[1].style.width = '0%';
                    }
                    else {
                        karaEffect[0].innerHTML = syncData[index + 1].text;

                        firstLyric[0].childNodes[0].data = `${syncData[index + 1].text}`;

                        karaEffect[0].style.width = '0%'; 
                    }
                    updatedLyric.start = element.start;
                    updatedLyric.end = element.end;
                }
                var lyricRun = (audioPlayer.currentTime - element.start)/(element.end - element.start) * 110;
                // console.log(audioPlayer.currentTime, element.end, lyricRun);
                if(index % 2 === 0) {
                    karaEffect[0].style.width = `${lyricRun}%`;
                }
                else {
                    karaEffect[1].style.width = `${lyricRun}%`;
                }
            }
        })
    })
}
