const ACTION_HEADER = 'PLAYER_';

export const REQUEST_PLAYER = ACTION_HEADER + 'REQUEST_PLAYER';
function requestPlayer() {
    console.log('Requesting Player');
    return {
        type: REQUEST_PLAYER,
    };
}

export const RECEIVE_PLAYER = ACTION_HEADER + 'RECEIVE_PLAYER';
function receivePlayer(json, playerId, teams) {
    console.log('Player Received');
    return {
        type: RECEIVE_PLAYER,
        payload: {
            json: json,
            player: playerId,
            teams: teams,
        },
    };
}

export function fetchPlayer(playerId, teams) {
    return function(dispatch) {
        dispatch(requestPlayer());
        return fetch(`https://fantasy.premierleague.com/api/element-summary/${playerId}/`, {
            headers: new Headers({'User-Agent': 'FPL Live App'}),
            credentials: 'include',
        }).then(
            response => {
                if (response.ok) {
                    return response.json();
                }
                console.log('Failed to get player.');
            }
        ).then(
            json => {
                dispatch(receivePlayer(json, playerId, teams));
            }
        );
    };
}
