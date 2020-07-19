import {REQUEST_PLAYER, RECEIVE_PLAYER} from '../actions/PlayerActions';
import PlayerDetails from '../models/PlayerDetails';

export default (state = {
    isFetching: false,
    players: {},
}, action) => {
    switch (action.type) {
        case REQUEST_PLAYER:
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.payload.player]: {
                        isFetching: true,
                        player: {}
                    }
                }
            };
        case RECEIVE_PLAYER:
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.payload.player]: {
                        isFetching: false,
                        player: PlayerDetails.fromJson(action.payload.teams)(action.payload.json)
                    },
                },
            };
        default:
            return state;
    }
};
