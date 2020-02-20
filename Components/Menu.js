import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { View, Text, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../Constants/Colors';
import { toogleContextMenu } from '../store/actions';

const Menu = () => {
    const dispatch = useDispatch();
    const {
        position,
        options
    } = useSelector(state => state.contextMenu);

    if (!position) {
        return null;
    }

    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }

    const backdropPressHandler = () => {
        closeMenu();
    };

    const closeMenu = () => dispatch(toogleContextMenu(null));

    return (
        <View style={styles.transparentBackdrop}>
            <TouchableWithoutFeedback onPress={backdropPressHandler}>
                <View style={styles.transparentBackdrop} ></View>
            </TouchableWithoutFeedback>
            <View style={[styles.menu, position]}>
                {options.map((opt, i) => <View key={i}>
                    <TouchableComponent onPress={(ev) => {
                        opt.onPress(ev);
                        closeMenu();
                    }}>
                        <Text style={styles.optionText}>{opt.label}</Text>
                    </TouchableComponent>
                </View>)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    transparentBackdrop: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
    },
    menu: {
        position: 'absolute',
        backgroundColor: Colors.white,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 10,
        shadowRadius: 100,
        elevation: 10,
        width: 200,
        flexDirection: 'column',
        zIndex: 11
    },
    optionText: {
        marginHorizontal: 16,
        height: 45,
        textAlignVertical: 'center'
    }
});

export default Menu;