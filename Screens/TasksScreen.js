import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import TaskListItem from '../Components/TaskListItem';
import { myTasks } from '../data/dummy-data';
import Colors from '../Constants/Colors';
import { Button } from 'react-native-paper';

const TasksScreen = (props) => {
    const [tasks, setTasks] = useState(myTasks.filter(x => x.isCompleted !== true));



    const completeTaskHandler = idx => {
        setTasks(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(idx, 1);
            return updatedState;
        });
    };

    return (
        <View style={styles.screen}>
            {tasks.length > 0
                ? <FlatList
                    style={styles.tasksList}
                    data={tasks}
                    keyExtractor={(item, _) => item.id}
                    renderItem={itemData => (
                        <TaskListItem
                            task={itemData.item}
                            onTaskComplete={() => completeTaskHandler(itemData.index)}
                        />
                    )}
                />
                : <View style={styles.noTasksInfoWrapper}>
                    <View style={styles.noTasksInfo}>
                        <Text style={styles.noTasksInfoText}>There are no pending tasks.</Text>
                        <Button style={styles.noTasksInfoText}>Add New Task.</Button>
                    </View>
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    tasksList: {
        flex: 1,
        width: '100%'
    },
    noTasksInfoWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noTasksInfo: {
        padding: 30,
        backgroundColor: Colors.primary
    },
    noTasksInfoText: {
        fontSize: 22,
        color: Colors.secondary,
        textAlign: 'center'
    }
});

export default TasksScreen;