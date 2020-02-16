import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, RefreshControl, Dimensions, ActivityIndicator } from 'react-native';
import TaskListItem from '../Components/TaskListItem';
import Card from '../Components/Card';
import Header from '../Components/Header';
import Colors from '../Constants/Colors';
import axios from '../axios/axios';

const CompletedTasksScreen = (props) => {
    const [tasks, setTasks] = useState([]);
    const [uncompletedTasks, setUncompletedTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        let didCancel = false;
        console.log('useEffect')
        async function getTasks() {
            setLoading(true);
            try {
                const { data } = await axios.get('/tasks.json');
                if (!didCancel) {
                    const dbIds = Object.keys(data);
                    const fetchedTasks = [];
                    dbIds.forEach(id => {
                        if (data[id].isCompleted) {
                            fetchedTasks.push({ ...data[id], id });
                        }
                    });
                    setTasks(fetchedTasks);
                }
            }
            catch (err) {
                console.log('err', err);
                console.log(JSON.stringify(err, null, '\t'));
                if (!didCancel) {
                    const message = err.response ? err.response.data.error : err.message
                    setError(message);
                }
            }
            if (!didCancel) {
                setLoading(false);
            }
        }
        getTasks();

        return () => { didCancel = true };
    }, []);

    const uncompleteTaskHandler = async idx => {
        
        const task = {...tasks[idx], isCompleted: false, completedAt: null};

        try {
            const url = `/tasks/${tasks[idx].id}.json`;
            const { data } = await axios.patch(url, {
                isCompleted: false,
                completedAt: null
            });

            setUncompletedTasks(prevState => prevState.concat(task));
            setTasks(prevState => {
                const updatedState = prevState.filter(x => x.id !== task.id);
                return updatedState;
            });
        }
        catch (err) {
            alert('Sorry, could not mark task as uncompleted.\nPlease, refresh and try again.');
        }
    };

    const refreshHandler = async ev => {
        setRefreshing(true);
        try {
            const { data } = await axios.get('/tasks.json');
            const dbIds = Object.keys(data);
            const fetchedTasks = [];
            dbIds.forEach(id => {
                if (data[id].isCompleted) {
                    fetchedTasks.push({ ...data[id], id });
                }
            });
            setTasks(fetchedTasks);

        }
        catch (err) {
            console.log(JSON.stringify(err, null, '\t'));
            const message = err.response ? err.response.data.error : err.message
            setError(message);
        }
        setRefreshing(false);
    }

    if (loading) {
        return <View style={[styles.screen, styles.positionInfo]}>
            <ActivityIndicator color={Colors.secondary} size="large" style={{ scaleX: 1.5, scaleY: 1.5 }} />
        </View>
    }
    if (error) {
        return <View style={[styles.screen, styles.positionInfo]}>
            <Card>
                <Header>Opss, somethig went wrong. 😵😱😵</Header>
                <View><Text>{error}</Text></View>
            </Card>
        </View>
    }

    return (
        <View style={styles.screen}>
            {tasks.length > 0
                ? <FlatList
                    style={styles.tasksList}
                    refreshing={refreshing}
                        refreshControl={<RefreshControl
                            title="refreshing..."
                            refreshing={refreshing}
                            onRefresh={refreshHandler}
                            colors={[Colors.secondary, Colors.sLight, Colors.secondary, Colors.sDark]}
                            size="large" />}
                        style={styles.tasksList}
                    data={tasks}
                    keyExtractor={(item, _) => item.id}
                    renderItem={itemData => (
                        <TaskListItem
                            task={itemData.item}
                            onTaskComplete={() => uncompleteTaskHandler(itemData.index)}
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
        flexDirection: 'column',
        alignItems: 'center'
    },
    tasksList: {
        flex: 1,
        width: '100%'
    },
    positionInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noTasksInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 25,
        paddingHorizontal: 20,
        backgroundColor: Colors.primary
    },
    noTasksInfoText: {
        fontSize: 22,
        color: Colors.secondary,
        textAlign: 'center',
        paddingBottom: 20
    },
    numOfTasksText: {
        paddingVertical: 3,
        paddingHorizontal: 5,
        fontSize: Dimensions.get('screen').width < 500 ? 10 : 12,
        fontStyle: 'italic'
    }
});

export default CompletedTasksScreen;