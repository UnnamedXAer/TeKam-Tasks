import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Colors from '../Constants/Colors';

const Button = ({ onPress, children }) => {
    const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <TouchableComponent onPress={onPress}>
            <View style={styles.button}>
            <Text style={styles.text}>{children}</Text>
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
    }
})

export default Button;
