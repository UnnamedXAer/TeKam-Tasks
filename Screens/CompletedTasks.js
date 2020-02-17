import React, { useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    FlatList, 
    Text, 
    RefreshControl, 
    Dimensions, 
    ActivityIndicator 
} from 'react-native';
import TaskListItem from '../Components/TaskListItem';
import Card from '../Components/Card';
import Header from '../Components/Header';
import Colors from '../Constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';

const CompletedTasksScreen = () => {
    const tasks = useSelector(state => state.tasks.completed);
    const loading = useSelector(state => state.tasks.compleatedLoading);
    const error = useSelector(state => state.tasks.compleatedError);
    const refreshing = useSelector(state => state.tasks.compleatedRefreshing);
    const tasksLoading = useSelector(state => state.tasks.tasksLoading);
    const tasksErrors = useSelector(state => state.tasks.tasksErrors);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.fetchTasks(true));
    }, []);

    const uncompleteTaskHandler = id => {
        dispatch(actions.toggleComplete(id, false));
    };

    const refreshHandler = ev => {
        dispatch(actions.refreshTasks(true));
    };

    const deleteTaskHandler = id => {
        console.log('I\'m deleting. ', id);
        // dispatch something
    }

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
            <Text style={styles.noTasksInfoText}>There are no completed tasks yet.</Text>
        </View>;
    }

    return (
        <View style={[styles.screen, (!loading ? styles.positionInfo : {})]}>
            <>
                {floatedInfo}
                <Text style={styles.numOfTasksText}>
                    You have {tasks.length} completed tasks.
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
                    renderItem={({item}) => (
                        <TaskListItem
                            isLoading={!!tasksLoading[item.id]}
                            error={tasksErrors[item.id]}
                            task={item}
                            onTaskComplete={() => uncompleteTaskHandler(item.id)}
                            onTaskDelete={() => deleteTaskHandler(item.id)}
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

export default CompletedTasksScreen;