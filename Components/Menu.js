import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { View, Text, Platform, StyleSheet } from 'react-native';
import Colors from '../Constants/Colors';

const Menu = ({ options, position }) => {

    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }

    return (<View style={[styles.menu, position]}>
        {options.map((opt, i) => <View key={i}>
            <TouchableComponent  onPress={opt.onPress}>
                <Text style={styles.optionText}>{opt.label}</Text>
            </TouchableComponent>
        </View>)}
    </View>);
};

const styles = StyleSheet.create({
    menu: {
        position: 'absolute',
        backgroundColor: Colors.white,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 6,
        shadowRadius: 6,
        elevation: 3,
        width: 300,
        flexDirection: 'column',
    },
    optionText: {
        marginVertical: 10,
        marginHorizontal: 16
    }
});

export default Menu;