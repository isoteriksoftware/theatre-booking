import * as constants from './constants';

export const admin = {
    logout: () => ({type: constants.admin.LOGOUT}),

    authenticate: (authenticated, data, logout) => {
        return {
            type: constants.admin.AUTHENTICATE, 
            payload: {
                authenticated: authenticated,
                data: data,
                logout: logout,
            }
        }
    },
};

export const user = {
    logout: () => ({type: constants.user.LOGOUT}),

    authenticate: (authenticated, data, logout) => {
        return {
            type: constants.user.AUTHENTICATE, 
            payload: {
                authenticated: authenticated,
                data: data,
                logout: logout,
            }
        }
    },

    addToCart: (item) => ({ type: constants.user.ADD_TO_CART, payload: item }),
};