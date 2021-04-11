import * as constants from '../actions/constants';

const initialState = {
    isLogout: false,
    auth: {
        authenticated: false,
        data: {},
        logout: '',
    },
    cart: [],
};

// Check for any session data
if (sessionStorage.getItem('auth')) {
    initialState.auth = JSON.parse(sessionStorage.getItem('auth'));
}

export const userReducer = (state = initialState, action) => {
    if (action.type === constants.user.LOGOUT) {
        const newState = {...state};
        newState.auth = {
            authenticated: false,
            data: {},
            logout: '',
        };

        return newState;
    }

    else if (action.type === constants.user.AUTHENTICATE) {
        const newState = {...state};
        newState.auth = {...action.payload};

        // store the data in session (this caches the data in case the user refreshes the window)
        sessionStorage.setItem('auth', JSON.stringify(newState.auth));
        return newState;
    }

    else if (action.type === constants.user.ADD_TO_CART) {
      const newState = {...state};
      newState.cart = [...state.cart, action.payload];
      
      return newState;
  }
    
    return state;
};