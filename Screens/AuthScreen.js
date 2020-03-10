import React, { useReducer, useState, useRef } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import Cart from '../Components/Cart';
import Button from '../Components/Button';
import Colors from '../Constants/Colors';
import { useDispatch } from 'react-redux';
import { authorize } from '../store/actions/auth';

const UPDATE_FORM = 'UPDATE_FORM';

const getInitialFormState = () => {
    const fields = ['emailAddress', 'password'];
    const state = {
        formValidity: false,
        values: {},
        validities: {},
        touches: {}
    };
    fields.forEach(field => {
        state.values[field] = '';
        state.validities[field] = false;
        state.touches[field] = false;
    });
    return state;
};

const formReducer = (state, action) => {
    if (action.type === UPDATE_FORM) {
        const updatedValues = { ...state.values, [action.fieldName]: action.value };
        const updatedValidities = { ...state.validities, [action.fieldName]: action.isValid };
        const updatedTouches = { ...state.touches, [action.fieldName]: true };

        let updatedFormValidity = true;
        for (const key in updatedValidities) {
            if (!updatedValidities[key]) {
                updatedFormValidity = false;
                break;
            }
        }

        return {
            values: updatedValues,
            validities: updatedValidities,
            touches: updatedTouches,
            formValidity: updatedFormValidity
        };
    }

    return { ...state };
}

const AuthScreen = (props) => {

    const dispatch = useDispatch();
    const [formState, dispatchForm] = useReducer(formReducer, getInitialFormState());
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLogIn, setIsLogIn] = useState(true);

    const passwordRef = useRef();

    const inputChangeHandler = (fieldName, text) => {
        let isValid = true;

        if (!isLogIn) {
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


            if (fieldName === 'emailAddress' && !emailRegex.test(text)) {
                isValid = false;
            }
            else if (fieldName === 'password' && text.length === 0) {
                isValid = false;
            }
        }
        const action = {
            type: UPDATE_FORM,
            fieldName,
            value: text,
            isValid
        };
        dispatchForm(action);
    };

    const emailAddressSubmitHandler = () => {
        passwordRef.current.focus();
    };

    const passwordSubmitHandler = () => {
        submit();
    };

    const submitHandler = () => {
        submit();
    }

    const submit = async () => {
        setLoading(true);
        setError(null);

        const { emailAddress, password } = formState.values;
        if (isLogIn) {
            if (!emailAddress || !password) {
                setLoading(false);
                return setError('Wrong credentials!');
            }
        }
        else {
            if (!formState.validities.emailAddress || !formState.validities.password) {
                setLoading(false);
                return setError('Please correct marked fields.');
            }
        }
        try {
            await dispatch(authorize(emailAddress, password, isLogIn));
            props.navigation.navigate('Tasks');
        }
        catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.screen} keyboardVerticalOffset={90} behavior="padding">
            <View style={styles.screenContainer}>
                <View style={styles.contetn}>
                    <Cart>
                        <ScrollView >
                            <View><Text>{error}</Text></View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.label}>Email Address</Text>
                                <TextInput
                                    style={{
                                        ...styles.input,
                                        ...((!formState.validities.emailAddress
                                            && formState.touches.emailAddress)
                                            ? { borderBottomColor: Colors.danger }
                                            : {})
                                    }}
                                    placeholder="address@email.com"
                                    keyboardType="email-address"
                                    nativeID="emailAddress"
                                    autoCompleteType="email"
                                    returnKeyType="next"
                                    value={formState.values.emailAddress}
                                    onChangeText={inputChangeHandler.bind(this, 'emailAddress')}
                                    onSubmitEditing={emailAddressSubmitHandler}
                                />
                                {formState.touches.emailAddress &&
                                    !formState.validities.emailAddress &&
                                    <Text style={styles.inputErrorText}>
                                        Please enter a valid email address.
                            </Text>}
                            </View>

                            <View style={styles.inputWrapper}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    ref={passwordRef}
                                    style={{
                                        ...styles.input,
                                        ...((!formState.validities.password && formState.touches.password)
                                            ? { borderBottomColor: Colors.danger }
                                            : {})
                                    }}
                                    placeholder="Password"
                                    keyboardType="default"
                                    nativeID="password"
                                    autoCompleteType="password"
                                    returnKeyType="go"
                                    value={formState.values.password}
                                    onChangeText={inputChangeHandler.bind(this, 'password')}
                                    onSubmitEditing={passwordSubmitHandler}
                                />
                                {formState.touches.password &&
                                    !formState.validities.password &&
                                    <Text style={styles.inputErrorText}>
                                        Your password must be at least 6 characters long,
                                         contain at least lowercase letters and one number.
                                </Text>}
                            </View>

                            <View style={styles.actions}>
                                <Button onPress={submitHandler} loading={loading}>{isLogIn ? 'Sign In' : 'Sign Up'}</Button>
                                <Button style={{ height: 35 }}
                                    styleText={styles.swithLogInButtonText}
                                    filled={false}
                                    onPress={() => setIsLogIn(prevState => !prevState)}>
                                    Switch to Sign {!isLogIn ? 'In' : 'Up'}
                                </Button>
                            </View>

                        </ScrollView>
                    </Cart>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    contetn: {
        width: '90%',
        maxWidth: 400,
        maxHeight: 400
    },
    error: {
        minHeight: 10
    },
    errorTitleText: {
        marginTop: 10,
        fontSize: 10,
        fontStyle: 'italic',
        color: Colors.danger
    },
    errorText: {
        marginVertical: 15,
        color: Colors.danger,
        textAlign: 'center'
    },
    inputWrapper: {
        marginBottom: 8
    },
    label: {
        marginHorizontal: 5,
        fontWeight: 'bold'
    },
    inputErrorText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Colors.danger,
        paddingHorizontal: 5,
        textAlign: 'left'
    },
    input: {
        borderColor: Colors.secondary,
        borderWidth: 0,
        borderBottomWidth: 2,
        paddingHorizontal: 16,
        paddingTop: 5,
        margin: 5
    },
    actions: {
        marginTop: 20,
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    swithLogInButtonText: {
        fontSize: 14,
        fontWeight: 'normal'
    }
});

export default AuthScreen;