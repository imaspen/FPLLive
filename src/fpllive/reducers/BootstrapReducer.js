import {REQUEST_BOOTSTRAP, RECEIVE_BOOTSTRAP} from '../actions/BootstrapActions';
import Team from '../models/Team';
import Player from '../models/Player';
import Bootstrap from '../models/Bootstrap';

export default (state = {
    isFetching: false,
    players: [],
    teams: [],
}, action) => {
    switch (action.type) {
        case REQUEST_BOOTSTRAP:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_BOOTSTRAP:
            const teams = action.payload.teams.map(Team.fromJson);
            const players = action.payload.elements.map(Player.fromJson(teams));
            const bootstrap = Bootstrap.fromJson(action.payload);
            return {
                ...state,
                isFetching: false,
                players: players,
                bootstrap: bootstrap,
            };
        default:
            return state;
    }
};
