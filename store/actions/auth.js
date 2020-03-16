import { AUTHORIZE, LOGOUT } from "./actionTypes";
import axios from "../../axios/axios";
import { FIREBASE_API_KEY } from "../../env";
import { AsyncStorage } from "react-native";

export const authorize = (emailAddress, password, isLogIn) => {
    return async dispatch => {

        const url = `https://identitytoolkit.googleapis.com/v1/accounts:${
            isLogIn ? 'signInWithPassword' : 'signUp'
            }?key=${FIREBASE_API_KEY}`;
        try {
            const response = await axios.post(url, {
                email: emailAddress,
                password: password,
                returnSecureToken: true
            });

            const userData = {
                userId: response.data.localId,
                token: response.data.idToken,
                emailAddress: response.data.email,
                refreshToken: response.data.refreshToken,
                expirationTime: Date.now() + (+response.data.expiresIn * 1000)
            };
            dispatch(logIn(userData));

        }
        catch (err) {
            if (err.isAxiosError) {
                const message = err.response.data.error.message;
                if (message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                    throw new Error(
                        'We have blocked all requests from this device due to unusual activity. Try again later.'
                    );
                }
                if (isLogIn) {
                    if (message === 'INVALID_EMAIL') {
                        throw new Error('The email address is not valid.');
                    }
                    if (message === 'EMAIL_NOT_FOUND') {
                        throw new Error('Invalid credentials, check Your data and try again.');
                    }
                    if (message === 'INVALID_PASSWORD') {
                        throw new Error('Invalid credentials, check Your data and try again.');
                    }
                    if (message === 'USER_DISABLED') {
                        throw new Error('The user account has been disabled by an administrator.');
                    }
                }
                else {
                    if (message === 'MISSING_EMAIL') {
                        throw new Error('Please fill email address and try again.')
                    }
                    if (message === 'INVALID_EMAIL') {
                        throw new Error('The email address is not valid.');
                    }
                    if (message === 'MISSING_PASSWORD' || message === 'WEAK_PASSWORD' || message === 'WEAK_PASSWORD : Password should be at least 6 characters') {
                        throw new Error('Password should be at least 6 characters long.');
                    }
                    if (message === 'EMAIL_EXISTS') {
                        throw new Error('The email address is already in use by another account.');
                    }
                    if (message === 'OPERATION_NOT_ALLOWED') {
                        throw new Error('Registration is disabled.');
                    }
                }
            }

            throw new Error('Somethig went wrong, please try again later.');
        }
    };
};

export const logIn = (userData) => {
    return async dispatch => {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));

        const action = {
            type: AUTHORIZE,
            payload: userData
        };
        dispatch(action);
    }
};

export const authorizeByRefreshToken = (userData) => {
    return async (dispatch) => {

        const url = `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`;
        try {
            const response = await axios.post(url, {
                refresh_token: userData.refreshToken,
                grant_type: "refresh_token"
            });

            userData.refreshToken = response.data.refresh_token;
            userData.token = response.data.access_token;
            userData.expirationTime = Date.now() + (+response.data.expires_in * 1000);
            dispatch(logIn(userData));
        }
        catch (err) {
            throw err;
        }
    }
}

export const logOut = () => {
    return async dispatch => {
        await AsyncStorage.removeItem('userData');

        dispatch({
            type: LOGOUT
        });
    }
};