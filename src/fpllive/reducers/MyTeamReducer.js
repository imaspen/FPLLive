import {REQUEST_MY_TEAM, RECEIVE_MY_TEAM} from '../actions/MyTeamActions';
import Pick from '../models/Pick';

export default (state = {
    isFetching: false,
    picks: [],
}, action) => {
    switch (action.type) {
        case REQUEST_MY_TEAM:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_MY_TEAM:
            return {
                ...state,
                isFetching: false,
                picks: action.payload.picks,
            };
        default:
            return state;
    }
};
