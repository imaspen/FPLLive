const ACTION_HEADER = 'LEAGUE_';

export const REQUEST_LEAGUE = ACTION_HEADER + 'REQUEST_LEAGUE';

function requestLeague() {
    console.log('Requesting League');
    return {
        type: REQUEST_LEAGUE,
    };
}

export const RECEIVE_LEAGUE = ACTION_HEADER + 'RECEIVE_LEAGUE';

function receiveLeague(json) {
    console.log('League Received');
    return {
        type: RECEIVE_LEAGUE,
        payload: json,
    };
}

export function fetchLeague(league_id) {
    return function(dispatch) {
        dispatch(requestLeague());

        return fetch(`https://fantasy.premierleague.com/api/leagues-classic/${league_id}/standings/`, {
            headers: new Headers({'User-Agent': 'FPL Live App'}),
            credentials: 'include',
        }).then(
            response => {
                if (response.ok) {
                    return response.json();
                }
                console.log('Failed to get league.');
            }
        ).then(
            json => {
                dispatch(receiveLeague(json));
            }
        );
    };
}
