import { CONTEXT_MENU_TOOGLE } from '../actions/actionTypes';

const initialState = {
    position: null,
    options: []
};

const toogleContextMenu = (state, action) => {
    return {
        ...state,
        position: action.position,
        options: action.options
    };
};

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTEXT_MENU_TOOGLE: return toogleContextMenu(state, action);
        default:
            return state;
    }
};