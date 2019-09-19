import {RECEIVE, REQUEST} from '../actions/TeamActions';

export default (state = {
    isFetching: false,
    account: {},
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
                account: action.payload,
            };
        default:
            return state;
    }
};
