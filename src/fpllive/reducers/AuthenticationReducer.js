import {REQUEST_AUTHENTICATE, RECEIVE_AUTHENTICATE, ALREADY_AUTHENTICATED} from '../actions/AuthenticateActions';

export default (state = {
    isFetching: false,
    isAuthenticated: false,
}, action) => {
    switch (action.type) {
        case REQUEST_AUTHENTICATE:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_AUTHENTICATE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
            };
        case ALREADY_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true,
            };
        default:
            return state;
    }
};
