import {authenticateActions} from './AuthenticateActions';

const ACTION_HEADER = 'MY_TEAM_';

export const REQUEST_MY_TEAM = ACTION_HEADER + 'REQUEST_MY_TEAM';
function requestMyTeam() {
    console.log('Requesting My Team');
    return {
        type: REQUEST_MY_TEAM,
    };
}

export const RECEIVE_MY_TEAM = ACTION_HEADER + 'RECEIVE_MY_TEAM';
function receiveMyTeam(json) {
    console.log('My Team Received');
    return {
        type: RECEIVE_MY_TEAM,
        payload: json,
    };
}

export function fetchMyTeam(teamId) {
    return function(dispatch) {
        dispatch(requestMyTeam());

        const myTeam = fetch(`https://fantasy.premierleague.com/api/my-team/${teamId}/`, {
            headers: new Headers({'User-Agent': 'FPL Live App'}),
            credentials: 'include',
        }).then(
            response => {
                if (response.ok) {
                    return response.json();
                }
                console.log('Failed to get my team.');
            }
        ).then(
            json => {
                dispatch(receiveMyTeam(json));
            }
        );
        return myTeam;
    };
}
