import {alreadyAuthenticated} from './AuthenticateActions';

const ACTION_HEADER = 'ACCOUNT_';

export const REQUEST = ACTION_HEADER + 'REQUEST';

function requestAccount() {
    console.log('Requesting Account Details');
    return {
        type: REQUEST,
    };
}

export const RECEIVE = ACTION_HEADER + 'RECEIVE';

function receiveAccount(accountDetails) {
    console.log('Account Received');
    return {
        type: RECEIVE,
        payload: accountDetails,
    };
}

export function fetchAccount() {
    return function (dispatch) {
        dispatch(requestAccount());

        return fetch('https://fantasy.premierleague.com/api/me/', {
            headers: new Headers({'User-Agent': 'FPL Live App'}),
            credentials: 'include',
        }).then(
            response => {
                if (response.ok) {
                    return response.json();
                }
                console.log('Failed to get account.');
            }
        ).then(
            json => {
                if (json.player !== null) {
                    dispatch(alreadyAuthenticated());
                }
                dispatch(receiveAccount(json));
            }
        );
    };
}
