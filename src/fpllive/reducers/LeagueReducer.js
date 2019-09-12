import {RECEIVE_LEAGUE, REQUEST_LEAGUE, SET_LEAGUE} from '../actions/LeagueActions';
import League from '../models/League';

export default (state = {
    isFetching: false,
    league: {},
}, action) => {
    switch (action.type) {
        case SET_LEAGUE:
            return {
                ...state,
                league: {...action.payload},
            };
        case REQUEST_LEAGUE:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_LEAGUE:
            return {
                ...state,
                isFetching: false,
                league: League.fromJson(action.payload),
            };
        default:
            return state;
    }
};
