const ACTION_HEADER = 'COMPARE_TEAM_';

export const REQUEST = ACTION_HEADER + 'REQUEST';
function requestCompareTeam() {
    console.log('Requesting Compare Team');
    return {
        type: REQUEST,
    };
}

export const RECEIVE = ACTION_HEADER + 'RECEIVE';
function receiveCompareTeam(json, teamId) {
    console.log('Compare Team Received');
    return {
        type: RECEIVE,
        payload: {
            picks: json.picks,
            team: teamId,
        },
    };
}

export function fetchCompareTeam(teamId, week) {
    return function(dispatch) {
        dispatch(requestCompareTeam());

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
                dispatch(receiveCompareTeam(json, teamId));
            }
        );
    };
}
