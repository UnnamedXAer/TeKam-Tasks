import { CONTEXT_MENU_TOOGLE } from '../actions/actionTypes';


export const toogleContextMenu = (position = null, options = []) => {
    return {
        type: CONTEXT_MENU_TOOGLE,
        options,
        position
    };
};