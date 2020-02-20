import React from 'react';
import {
    View,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
import { toogleContextMenu } from '../store/actions';
import { useDispatch } from 'react-redux';

const TaskMenu = ({ isEnabled, deleteTask, toggleTaskComplete, isCompleted }) => {
    const dispatch = useDispatch();
    const menuButtonTouchHandler = (ev) => {
        const { pageX, locationX, pageY, locationY } = ev.nativeEvent;
        const left = pageX - locationX;
        let top = pageY - locationY;
        const widowHeight = Dimensions.get('window').height;
        const optCnt = options.length;
        const menuHeight = optCnt * (25 + 20) + 10;
        const menuBottom = top + menuHeight;
        if (menuBottom > widowHeight) {
            top = widowHeight - menuHeight;
        }
        dispatch(toogleContextMenu({ left, top }, options));
    };

    const options = [
        {
            label: 'Delete', onPress: () => {
                deleteTask();
            }
        },
        {
            label: isCompleted ? 'Mark as Pending' : 'Complete', onPress: () => {
                toggleTaskComplete();
            }
        }
    ];

    return (
        <View style={styles.menuButton} >
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
        position: 'absolute',
        left: -10, top: -10
    },
    dotsWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 30,
        height: 35,
        paddingVertical: 5
    },
    dot: {
        height: 4,
        width: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(102, 102, 102, 0.5)'
    }
});

export default TaskMenu;