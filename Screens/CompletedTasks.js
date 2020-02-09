import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import TaskListItem from '../Components/TaskListItem';
import { myTasks } from '../data/dummy-data';
import Colors from '../Constants/Colors';

const CompletedTasksScreen = (props) => {
    const [tasks, setTasks] = useState(myTasks.filter(x => x.isCompleted === true));
    const unCompleteTaskHandler = async idx => {
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
                            onTaskComplete={() => unCompleteTaskHandler(itemData.index)}
                        />
                    )}
                />
                : <View style={styles.noTasksInfoWrapper}>
                    <View style={styles.noTasksInfo}>
                        <Text style={styles.noTasksInfoText}>There are no completed tasks yet.</Text>
                    </View>
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    tasksList: {
        flex: 1,
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

export default CompletedTasksScreen;