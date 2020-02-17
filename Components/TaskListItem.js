import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import Card from './Card';
import Colors from '../Constants/Colors';
import { dateToLocalString } from '../Utils/time';
import ImportanceLevel from '../Constants/ImportanceLevels';
import TaskError from './TaskError';
import TaskCompleteCheckbox from './TaskCompleteCheckbox';
import TaskMenu from './TaskMenu';

const TaskListItem = ({ task, onTaskComplete, onTaskDelete, isLoading, error }) => {

    return (
        <Card>
            <View style={styles.task}>
                <TaskError error={error} />
                <View style={styles.titleWrapper}>
                <TaskMenu onDelete={onTaskDelete} isEnabled={!isLoading} />
                    <Text style={styles.title} numberOfLines={2}>{task.title}</Text>
                    <TaskCompleteCheckbox onTaskComplete={onTaskComplete} isLoading={isLoading} isCompleted={task.isCompleted} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailText}>{task.createDate && dateToLocalString(task.createDate)}</Text>
                    <Text
                        style={{
                            ...styles.detailText,
                            textAlign: 'center',
                            fontWeight: task.importance === ImportanceLevel.IMPORTANT ? 'bold' : 'normal'
                        }}
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
    descriptionWrapper: {
        marginTop: 10
    },
    description: {

    },
    completedWrapper: {
        marginTop: 10,
        alignSelf: 'flex-end'
    },
    
});

export default TaskListItem;