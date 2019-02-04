import { SEARCH } from '../actions/types'

const initialState = {
    songs: [],
    albums: []
}

export default function(state = initialState, actions) {
    switch(actions.type) {
        case SEARCH:
            return {
                ...state,
                songs: actions.payload.songs,
                albums: actions.payload.albums
            };
        default: 
            return {
                ...state
            }
    }
}