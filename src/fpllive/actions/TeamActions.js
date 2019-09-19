const ACTION_HEADER = 'TEAM_';

export const REQUEST = ACTION_HEADER + 'REQUEST';
function requestTeam() {
    console.log('Requesting Team');
    return {
        type: REQUEST,
    };
}

export const RECEIVE = ACTION_HEADER + 'RECEIVE';
function receiveTeam(json, teamId) {
    console.log('Team Received');
    return {
        type: RECEIVE,
        payload: {
            picks: json.picks,
            team: teamId,
        },
    };
}

export function fetchTeam(teamId, week) {
    return function(dispatch) {
        dispatch(requestTeam());

        return fetch(`https://fantasy.premierleague.com/api/entry/${teamId}/event/${week}/picks/`, {
            headers: new Headers({'User-Agent': 'FPL Live App'}),
            credentials: 'include',
        }).then(
            response => {
                if (response.ok) {
                    return response.json();
                }
                console.log('Failed to get compare team.');
            }
        ).then(
            json => {
                dispatch(receiveTeam(json, teamId));
            }
        );
    };
}
