import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import Card from './Card';
import Colors from '../Constants/Colors';
import { dateToLocalString, datefromNow } from '../Utils/time';
import ImportanceLevel from '../Constants/ImportanceLevels';
import TaskError from './TaskError';
import TaskCompleteCheckbox from './TaskCompleteCheckbox';
import TaskMenu from './TaskMenu';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TaskListItem = ({ task, toggleTaskComplete, deleteTask, isLoading, isCompleted, error }) => {
    return (
        <Card>
            <View style={styles.task}>
                <TaskError error={error} />
                <View style={styles.taskDateWrapper}>
                    <Text style={[
                        styles.taskDate,
                        task.taskDate && new Date(task.taskDate) < new Date() ? { color: Colors.danger } : {}
                    ]}>
                        {task.taskDate && datefromNow(task.taskDate)}
                    </Text>
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title} numberOfLines={2}>{task.title}</Text>
                    <TaskCompleteCheckbox toggleTaskComplete={toggleTaskComplete} isLoading={isLoading} isCompleted={task.isCompleted} />
                </View>
                <View style={styles.details}>

                    <Text
                        style={{
                            ...styles.detailText,
                            textAlign: 'center',
                            fontWeight: task.importance === ImportanceLevel.HIGH ? 'bold' : 'normal'
                        }}
                    >
                        {ImportanceLevel[task.importance]}
                    </Text>
                    <View>
                        {task.reminderAt && <>
                            <Text
                                numberOfLines={1}
                                style={styles.detailText}
                            >
                                <MaterialCommunityIcons name="bell-ring-outline" />
                                {' ' + dateToLocalString(task.reminderAt)}</Text>
                        </>}
                    </View>
                </View>

                {task.description ? <View style={styles.descriptionWrapper}>
                    <Text style={styles.description} numberOfLines={3}>{task.description}</Text>
                </View> : null}

                {task.isCompleted && <View style={styles.completedWrapper}>
                    <Text style={styles.detailText}>Completed at {dateToLocalString(task.completedAt, true)}</Text>
                </View>}

            </View>
            <TaskMenu
                isCompleted={isCompleted}
                isEnabled={!isLoading}
                deleteTask={deleteTask}
                toggleTaskComplete={toggleTaskComplete}
            />
        </Card>);
};

const styles = StyleSheet.create({
    task: {
        flex: 1,
        paddingHorizontal: 10,
    },
    directionRow: {
        flexDirection: 'row'
    },
    taskDateWrapper: {
        marginLeft: 10
    },
    taskDate: {
        fontSize: 12
    },
    titleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: Colors.sDark,
        borderBottomWidth: 1,
        marginHorizontal: 5,
        marginTop: 0,
    },
    title: {
        width: '90%',
        fontSize: 18
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detailText: {
        fontSize: 10
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