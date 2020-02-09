import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Card from './Card';
import Colors from '../Constants/Colors';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { dateToLocalString } from '../Utils/time';
import ImportanceLevel from '../Constants/ImportanceLevels';

const TaskListItem = ({ task, onTaskComplete }) => {

    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }

    return (
        <Card>
            <View style={styles.task}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title} numberOfLines={2}>{task.title}</Text>
                    <View style={styles.completeTaskWrapper}>
                        <TouchableComponent 
                            style={{...styles.completeTask, 
                            backgroundColor: task.isCompleted ? Colors.secondary : ''}} 
                            onPress={onTaskComplete}>
                            <Feather name="check" size={28} color={task.isCompleted ? Colors.pDark : 'rgba(0,0,0,0.1)'} />
                        </TouchableComponent>
                    </View>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailText}>{task.createDate && dateToLocalString(task.createDate)}</Text>
                    <Text
                        style={{ 
                            ...styles.detailText, 
                            textAlign: 'center', 
                            fontWeight: task.importance === ImportanceLevel.IMPORTANT ? 'bold' : 'normal' }}
                    >
                        {task.importance}
                    </Text>
                    <Text 
                        style={{
                            ...styles.detailText,
                            color: task.reminderAt && new Date(task.reminderAt) < new Date() ? Colors.danger : undefined
                        }}
                    >
                        {task.reminderAt && dateToLocalString(task.reminderAt)}</Text>
                </View>
                <View style={styles.descriptionWrapper}>
                    <Text style={styles.description} numberOfLines={3}>{task.description}</Text>
                </View>
                {task.isCompleted && <View style={styles.completedWrapper}>
                    <Text style={styles.detailText}>Completed at {dateToLocalString(task.completedAt)}</Text>
                    </View>}
            </View>
        </Card>);
};

const styles = StyleSheet.create({
    task: {
        flex: 1,
        padding: 10
    },
    titleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: Colors.sDark,
        borderBottomWidth: 1,
        marginHorizontal: 5,
        marginVertical: 8
    },
    title: {
        maxWidth: '90%',
        fontSize: 18
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detailText: {
        flex: 0.3,
        fontSize: 10
    },
    completeTaskWrapper: {
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible'
    },
    completeTask: {
        flex: 1,
        width: 30,
        height: 30,
        borderColor: Colors.primary,
        borderWidth: 1,
        margin: 3
    },
    descriptionWrapper: {
        marginTop: 10
    },
    description: {

    },
    completedWrapper: {
        marginTop: 10,
        alignSelf: 'flex-end'
    }
});

export default TaskListItem;