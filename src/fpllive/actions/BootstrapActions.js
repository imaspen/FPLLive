const ACTION_HEADER = 'BOOTSTRAP_';

export const REQUEST_BOOTSTRAP = ACTION_HEADER + 'REQUEST_BOOTSTRAP';
function requestBootstrap() {
    console.log('Requesting Bootstrap');
    return {
        type: REQUEST_BOOTSTRAP,
    };
}

export const RECEIVE_BOOTSTRAP = ACTION_HEADER + 'RECEIVE_BOOTSTRAP';
function receiveBootstrap(json) {
    console.log('Bootstrap Received');
    return {
        type: RECEIVE_BOOTSTRAP,
        payload: json,
    };
}

export function fetchBootstrap() {
    return function(dispatch) {
        dispatch(requestBootstrap());
        return fetch('https://fantasy.premierleague.com/api/bootstrap-static/', {
            headers: new Headers({'User-Agent': 'FPL Live App'}),
            credentials: 'include',
        }).then(
            response => {
                if (response.ok) {
                    return response.json();
                }
                console.log('Failed to get bootstrap.');
            }
        ).then(
            json => {
                dispatch(receiveBootstrap(json));
            }
        );
    };
}
