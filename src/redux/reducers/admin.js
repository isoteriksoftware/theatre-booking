import * as constants from '../actions/constants';

const initialState = {
    isLogout: false,
    auth: {
        authenticated: false,
        data: {},
        logout: '',
    },
};

// Check for any session data
if (sessionStorage.getItem('admin-auth')) {
    initialState.auth = JSON.parse(sessionStorage.getItem('admin-auth'));
}

export const adminReducer = (state = initialState, action) => {
    if (action.type === constants.admin.LOGOUT) {
        const newState = {...state};
        newState.auth = {
            authenticated: false,
            data: {},
            logout: '',
        };

        return newState;
    }

    else if (action.type === constants.admin.AUTHENTICATE) {
        const newState = {...state};
        newState.auth = {...action.payload};

        // store the data in session (this caches the data in case the user refreshes the window)
        sessionStorage.setItem('admin-auth', JSON.stringify(newState.auth));
        return newState;
    }
    
    return state;
};