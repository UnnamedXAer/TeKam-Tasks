import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Colors from '../Constants/Colors';

const Button = ({ onPress, children, disabled }) => {
    const TouchableComponent = disabled 
    ? TouchableWithoutFeedback 
    : Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <TouchableComponent onPress={onPress} >
            <View style={{ ...styles.button, ...(disabled ? styles.disabled : {}) }}>
                <Text style={{ ...styles.text, ...(disabled ? styles.disabledText : {}) }}>{children}</Text>
            </View>
        </TouchableComponent>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: Colors.secondary,
        alignItems: 'center'
    },
    text: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    disabled: {
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
    disabledText: {
        color: 'rgba(0, 0, 0, 0.5)'
    }
})

export default Button;
