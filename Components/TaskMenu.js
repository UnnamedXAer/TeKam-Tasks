import React, { useState, useRef } from 'react';
import { View, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
// import {  } from 'react-native-gesture-handler';
import Menu from './Menu';
const TaskMenu = ({ isEnabled, openMenu, taskId }) => {
    const elRef = useRef(null);
    const [showMenu, setShowMenu] = useState(false);
    const menuButtonTouchHandler = (ev) => {
        console.log('------------ TOUCHED ---------');
        // console.log('ev', ev.nativeEvent);
        // console.log(elRef.current);
        const { pageX,locationX, locationY, pageY } = ev.nativeEvent;
        const pos = { left: locationX, rigth: locationY };
        console.log('\nPosition_: \n', pos);
        openMenu(pos, taskId);
    };

    return (
        <View style={styles.menuButton} ref={elRef}>
            <TouchableWithoutFeedback
                disabled={!isEnabled}
                onPress={menuButtonTouchHandler}>
                <View style={styles.dotsWrapper}>
                    <View style={styles.dot}></View>
                    <View style={styles.dot}></View>
                    <View style={styles.dot}></View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    menuButton: {
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
        marginRight: 5,
    },
    dotsWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 10,
        height: 30,
    },
    dot: {
        height: 5,
        width: 5,
        borderRadius: 2.5,
        backgroundColor: 'rgba(102, 102, 102, 0.5)'
    }
});

export default TaskMenu;