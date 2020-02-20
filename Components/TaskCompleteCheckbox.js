import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import Colors from '../Constants/Colors';

const TaskCompleteCheckbox = ({ isLoading, isCompleted, toggleTaskComplete }) => {

    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }

    return (
        <View style={styles.completeTaskWrapper}>
            <TouchableComponent
                style={{
                    ...styles.completeTask,
                    backgroundColor: isCompleted ? Colors.secondary : ''
                }}
                disabled={isLoading}
                onPress={toggleTaskComplete}>
                {isLoading
                    ? <View
                        style={styles.taskLoading}>
                        <ActivityIndicator
                            color={isCompleted ? Colors.pDark : Colors.secondary} size="small" />
                    </View>
                    : <Feather
                        name="check"
                        size={28}
                        color={isCompleted ? Colors.pDark : 'rgba(0,0,0,0.1)'} />}
            </TouchableComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    completeTaskWrapper: {
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
    },
    completeTask: {
        flex: 1,
        width: 30,
        height: 30,
        borderColor: Colors.primary,
        borderWidth: 1,
        margin: 3
    },
    taskLoading: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export default TaskCompleteCheckbox;
