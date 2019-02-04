import { UI_SEARCHING } from '../actions/types'

const initialState = {
    searching: false
}

export default function(state = initialState, actions) {
    switch(actions.type) {
        case UI_SEARCHING: 
            return {
                ...state,
                searching: actions.payload
            }
        default: 
            return state;
    }
}