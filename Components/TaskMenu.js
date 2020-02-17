import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { View, Platform, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../Constants/Colors';

const TaskMenu = ({ onDelete, isEnabled }) => {
    
    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }
    
    return (
        <View style={styles.menu}>
            <TouchableComponent style={styles.menuTouchable} onPress={isEnabled ? onDelete : void 0}>
                <MaterialCommunityIcons name="dots-vertical" color="#ccc" size={26} />
            </TouchableComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    menu: {
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
    },
    menuTouchable: {
        flex: 1,
        width: 30,
        height: 30,
        borderColor: Colors.primary,
        borderWidth: 1,
        margin: 3
    },
    // elementWrapper: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     flex: 1
    // }
})

export default TaskMenu;