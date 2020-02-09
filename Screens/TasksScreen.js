import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../Components/Header';
import TaskListItem from '../Components/TaskListItem';
import { myTasks } from '../data/dummy-data';

const TasksScreen = (props) => {

    return (
        <View style={styles.screen}>
            <Header>Tasks to Complete</Header>
            <FlatList
                style={styles.tasksList}
                data={myTasks}
                keyExtractor={(item, _) => item.id}
                renderItem={itemData => <TaskListItem task={itemData.item} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    tasksList: {
        flex: 1,
    }
});

export default TasksScreen;