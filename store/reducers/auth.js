import { AUTHORIZE, LOGOUT } from "../actions/actionTypes";

const initialState = {
    user: {
        emailAddress: null,
        token: null,
        userId: null
    }
};

const authorize = (state, action) => {
    return {
        ...action.payload
    };
};

const logOut = (state, action) => {
    return {
        ...initialState
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHORIZE: return authorize(state, action);
        case LOGOUT: return logOut(state, action);
        default:
            return state;
    };
};

export default reducer;