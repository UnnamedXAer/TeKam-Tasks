import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    ActivityIndicator,
    Dimensions,
    RefreshControl
} from 'react-native';
import TaskListItem from '../Components/TaskListItem';
import Colors from '../Constants/Colors';
import Header from '../Components/Header';
import Card from '../Components/Card';
import Button from '../Components/Button';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions';

const TasksScreen = (props) => {
    const tasks = useSelector(state => state.tasks.pending);
    const loading = useSelector(state => state.tasks.loading);
    const error = useSelector(state => state.tasks.error);
    const refreshing = useSelector(state => state.tasks.refreshing);
    const tasksLoading = useSelector(state => state.tasks.tasksLoading);
    const tasksErrors = useSelector(state => state.tasks.tasksErrors);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.fetchTasks());
    }, []);

    const completeTaskHandler = id => {
        dispatch(actions.toggleComplete(id, true));
    };

    const deleteTaskHandler = id => {
        dispatch(actions.deleteTask(id, false));
    };

    const refreshHandler = () => {
        dispatch(actions.refreshTasks());
    };

    if (loading) {
        return <View style={[styles.screen, styles.positionInfo]}>
            <ActivityIndicator
                color={Colors.secondary}
                size="large"
                style={{ scaleX: 1.5, scaleY: 1.5 }} />
        </View>;
    }

    let floatedInfo;

    if (error) {
        floatedInfo = <View style={[styles.screen, styles.floatedInfoPanel]}>
            <Card>
                <Header>Opss, somethig went wrong. 😵😱😵</Header>
                <View><Text>{error}</Text></View>
            </Card>
        </View>;
    }
    else if (tasks.length === 0) {
        floatedInfo = <View style={styles.floatedInfoPanel}>
            <Text style={styles.noTasksInfoText}>There are no pending tasks.</Text>
            <Button
                onPress={() => props.navigation.navigate({ routeName: 'NewTask' })}>
                ADD NEW TASK.
            </Button>
        </View>;
    }

    return (
        <View style={[styles.screen, (!loading ? styles.positionInfo : {})]}>
            <>
                {floatedInfo}
                <Text style={styles.numOfTasksText}>
                    You have {tasks.length} planned things to do.
                </Text>
                <FlatList
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
                    renderItem={({ item }) => (
                        <TaskListItem
                            error={tasksErrors[item.id]}
                            isLoading={!!tasksLoading[item.id]}
                            task={item}
                            toggleTaskComplete={() => completeTaskHandler(item.id)}
                            deleteTask={() => deleteTaskHandler(item.id)}
                            isCompleted={false}
                        />
                    )}
                />
            </>
        </View>
    );
};

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
    floatedInfoPanel: {
        margin: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 25,
        paddingHorizontal: 20,
        backgroundColor: Colors.primary,
        top: 80,
        position: 'absolute'
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

export default TasksScreen;