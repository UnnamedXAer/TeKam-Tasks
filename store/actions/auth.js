import { AUTHORIZE, LOGOUT } from "./actionTypes";
import axios from "../../axios/axios";

export const authorize = (emailAddress, password) => {
    return async dispatch => {

            const url = ``;
        try {
            const { data } = await axios.post(url, {
                email: emailAddress,
                password: password
            });

            console.log(data);

            dispatch({
                type: AUTHORIZE
            })
        }
        catch (err) {
            console.log('authorize error: \n', err);
        }
    };
};

export const logOut = () => {
    return {
        LOGOUT
    };
};