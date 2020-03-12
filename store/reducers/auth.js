import { AUTHORIZE, LOGOUT } from "../actions/actionTypes";

const initialState = {
    emailAddress: null,
    token: null,
    userId: null,
    expirationTime: null
};

const authorize = (state, action) => {
    return {
        ...state,
        ...action.payload
    };
};

const logOut = (state, action) => {
    return {
        ...initialState,
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