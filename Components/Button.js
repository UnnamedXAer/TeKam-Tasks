import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Colors from '../Constants/Colors';

const Button = ({ onPress, children, disabled, loading }) => {
    const TouchableComponent = disabled 
    ? TouchableWithoutFeedback 
    : Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <TouchableComponent onPress={onPress} disabled={loading} >
            <View style={{ ...styles.button, ...(disabled ? styles.disabled : {}) }}>
                {loading
                ? <ActivityIndicator color={Colors.primary} size="small" />
                : <Text style={{ ...styles.text, ...(disabled ? styles.disabledText : {}) }}>{children}</Text>}
            </View>
        </TouchableComponent>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 45,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    disabled: {
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
    disabledText: {
        color: 'rgba(0, 0, 0, 0.5)'
    }
})

export default Button;
