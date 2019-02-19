import { UI_SEARCHING, UI_NOTIFICATION, UI_ADD_TO_PLAYLIST } from '../actions/types'

const initialState = {
    searching: false,
    notification: false,
    add_song_id: null
}

export default function(state = initialState, actions) {
    switch(actions.type) {
        case UI_SEARCHING: 
            return {
                ...state,
                searching: actions.payload
            }
        case UI_NOTIFICATION: 
            return {
                ...state,
                notification: actions.payload.active,
                noti_message: actions.payload.message
            }
        case UI_ADD_TO_PLAYLIST: 
            return {
                ...state,
                add_song_id: actions.payload
            }
        default: 
            return state;
    }
}