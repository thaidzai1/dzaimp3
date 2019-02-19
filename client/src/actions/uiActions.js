import { UI_SEARCHING, UI_NOTIFICATION, UI_ADD_TO_PLAYLIST } from './types'

export const handleSearch = status => dispatch => {
}

export const handleNotification = (active, message) => dispatch => {
    setTimeout(function() {
        dispatch({type: UI_NOTIFICATION, payload: {active: false, message: ''}});
    }, 2000);
    return dispatch({
        type: UI_NOTIFICATION,
        payload: {active, message}
    })
}

export const uiAddSongToPlaylist = (song_id = null) => dispatch => {
    console.log('add to playlsit', song_id);
    return dispatch({
        type: UI_ADD_TO_PLAYLIST,
        payload: song_id
    })
}