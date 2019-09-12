import {RECEIVE, REQUEST} from '../actions/CompareTeamActions';

export default (state = {
    isFetching: false,
    picks: {},
}, action) => {
    switch (action.type) {
        case REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE:
            return {
                ...state,
                isFetching: false,
                picks: {
                    ...state.picks,
                    [action.payload.team]: action.payload.picks,
                },
            };
        default:
            return state;
    }
};
