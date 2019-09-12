const ACTION_HEADER = 'AUTHENTICATE_';

export const REQUEST_AUTHENTICATE = ACTION_HEADER + 'REQUEST_AUTHENTICATE';

function requestAuthentication() {
    console.log('Requesting Authentication');
    return {
        type: REQUEST_AUTHENTICATE,
    };
}

export const RECEIVE_AUTHENTICATE = ACTION_HEADER + 'RECEIVE_AUTHENTICATE';

function receiveAuthentication() {
    console.log('Authentication Received');
    return {
        type: RECEIVE_AUTHENTICATE,
    };
}


export function authenticate(email, password) {
    return function (dispatch) {
        dispatch(requestAuthentication());

        return fetch('https://users.premierleague.com/accounts/login/', {
            headers: new Headers({
                'User-Agent': 'FPL Live App',
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            method: 'POST',
            body:
                'login='
                + encodeURIComponent(email)
                + '&password='
                + encodeURIComponent(password)
                + '&app=plfpl-web&'
                + encodeURIComponent('redirect_uri') + '='
                + encodeURIComponent('https://fantasy.premierleague.com/'),
        }).then(
            response => {
                if (response.ok) {
                    dispatch(receiveAuthentication());
                }
            }
        );
    };
}
