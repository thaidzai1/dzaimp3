import axios from 'axios'

import { SEARCH } from './types'

export const getSearchResult = keyword => async dispatch => {
    let res;
    try {
        res = await axios.get(`/api/search/${keyword}`);
        if(res.status === 200) {
            return dispatch({
                type: SEARCH,
                payload: res.data
            })
        }
    }    
    catch(e) {
        console.log(e);
    }
}