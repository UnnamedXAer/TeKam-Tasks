import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { 
    TouchableOpacity, 
    TouchableNativeFeedback, 
    TouchableWithoutFeedback 
} from 'react-native-gesture-handler';
import Colors from '../Constants/Colors';

const Button = ({
    onPress,
    children,
    disabled,
    loading,
    filled = true,
    styleText = {},
    style = {}
}) => {
    const TouchableComponent = disabled
        ? TouchableWithoutFeedback
        : Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <TouchableComponent onPress={onPress} disabled={loading} >
            <View style={[
                styles.button,
                (disabled ? styles.disabled : {}),
                (filled ? styles.filled : styles.notFilled),
                style
            ]}>
                {loading
                    ? <ActivityIndicator color={Colors.primary} size="small" />
                    : <Text
                        style={[styles.text, (disabled ? styles.disabledText : {}), styleText]}>
                        {children}
                    </Text>}
            </View>
        </TouchableComponent>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 45,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filled: {
        backgroundColor: Colors.secondary,
        borderColor: Colors.secondary,
        borderWidth: 2
    },
    notFilled: {
        backgroundColor: Colors.white,
        borderColor: Colors.secondary,
        borderWidth: 2
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
