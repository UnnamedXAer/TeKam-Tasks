import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import Cart from '../Components/Cart';
import Colors from '../Constants/Colors';

const UPDATE_FORM = 'UPDATE_FORM';

const getInitialFormState = () => {
    const fields = ['emailAddress', 'password', 'confirmPassword'];
    const state = {
        formValidity: false
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

        const updatedFormValidity = true;
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

const AuthScreen = () => {

    const [formState, dispatchForm] = useReducer(formReducer, getInitialFormState());
    const [isLogIn, setIsLogIn] = useState(true);

    const inputChangeHandler = (fieldName, text) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const isValid = true;

        if (fieldName === 'emailAddress' && !emailRegex.test(text)) {
            isValid = false;
        }
        else if (fieldName === 'password' && text.length === 0) {
            isValid = false;
        }
        else if (fieldName === 'confirmPassword' && formState.values.password !== text) {
            isValid = false;
        }

        dispatchForm({
            type: UPDATE_FORM,
            fieldName,
            value: text,
            isValid
        });
    }

    return (
        <KeyboardAvoidingView style={styles.screen}>
            <ScrollView>
                <Cart>
                    
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={{
                                ...styles.input,
                                ...((!formState.validities.emailAddress && formState.touches.emailAddress)
                                    ? { borderBottomColor: Colors.danger }
                                    : {})
                            }}
                            placeholder="address@email.com"
                            keyboardType="email-address"
                            value={formState.values.emailAddress}
                            nativeID="emailAddress"
                            onChangeText={inputChangeHandler}
                            autoCompleteType="off"
                            // autoFocus={true}
                            returnKeyType="next"
                            onSubmitEditing={emailAddressSubmitHandler}
                        />
                        <Text style={styles.inputInfo}>Please enter a valid email address.</Text>
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={{
                                ...styles.input,
                                ...((!formState.validities.emailAddress && formState.touches.emailAddress)
                                    ? { borderBottomColor: Colors.danger }
                                    : {})
                            }}
                            placeholder="address@email.com"
                            keyboardType="email-address"
                            value={formState.values.emailAddress}
                            nativeID="emailAddress"
                            onChangeText={inputChangeHandler}
                            autoCompleteType="off"
                            // autoFocus={true}
                            returnKeyType="next"
                            onSubmitEditing={emailAddressSubmitHandler}
                        />
                        <Text style={styles.inputInfo}>Please enter a valid email address.</Text>
                    </View>

                </Cart>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
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
    inputInfo: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.35)',
        paddingHorizontal: 5,
        textAlign: 'right'
    },
    input: {
        borderColor: Colors.secondary,
        borderWidth: 0,
        borderBottomWidth: 2,
        paddingHorizontal: 16,
        paddingTop: 5,
        margin: 5
    },
});

export default AuthScreen;