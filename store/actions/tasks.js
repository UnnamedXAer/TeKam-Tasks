import axios from '../../axios/axios';
import * as actionTypes from './actionTypes';

export const fetchTasks = () => {
    return async dispatch => {
        dispatch(fetchTasksStart());

        try {
            const { data } = await axios.get('/tasks.json');
            throw new Error('error 123')
            dispatch(fetchTasksSuccess(data || {}));
        }
        catch (err) {
            const message = err.response ? err.response.data.error : err.message
            dispatch(fetchTasksFail(message));
        }
    };
};

const fetchTasksStart = () => {
    return {
        type: actionTypes.FETCH_TASKS_START
    };
};

const fetchTasksSuccess = (tasks) => {
    return {
        type: actionTypes.FETCH_TASKS_SUCCESS,
        tasks
    };
};

const fetchTasksFail = (error) => {
    return {
        type: actionTypes.FETCH_TASKS_FAIL,
        error
    };
};

export const toggleComplete = (id) => {
    return async dispatch => {
        dispatch(toggleCompleteStart(id));
        try {
            const url = `/tasks/${id}.json`;
            const { data } = await axios.patch(url, {
                isCompleted: true,
                completedAt: new Date().toISOString()
            });

            dispatch(toggleCompleteSuccess(id));
        }
        catch (err) {
            const message = err.response ? err.response.data.error : err.message
            // const message = 'Sorry, could not mark task as completed.\nPlease, refresh and try again.';
            alert(message);
            dispatch(toggleCompleteFail(message, id));
        }
    }
};

const toggleCompleteStart = (id) => {
    return {
        type: actionTypes.TOGGLE_COMPLETE_START,
        id
    };
};

const toggleCompleteSuccess = (id) => {
    return {
        type: actionTypes.TOGGLE_COMPLETE_SUCCESS,
        id
    };
};

const toggleCompleteFail = (error, id) => {
    return {
        type: actionTypes.TOGGLE_COMPLETE_START,
        error,
        id
    };
};

export const refreshTasks = () => {
    return async dispatch => {
        dispatch(refreshTasksStart());

        try {
            const { data } = await axios.get('/tasks.json');
            dispatch(refreshTasksSuccess(data || {}));
        }
        catch (err) {
            console.log('err', err);
            console.log(JSON.stringify(err, null, '\t'));
            const message = err.response ? err.response.data.error : err.message
            dispatch(refreshTasksFail(message));
        }
    };
};

const refreshTasksStart = () => {
    return {
        type: actionTypes.REFRESH_TASKS_START
    };
};

const refreshTasksSuccess = (tasks) => {
    return {
        type: actionTypes.REFRESH_TASKS_SUCCESS,
        tasks
    };
};

const refreshTasksFail = (error) => {
    return {
        type: actionTypes.REFRESH_TASKS_FAIL,
        error
    };
};

export const saveNewTask = (task) => {
    return async dispatch => {
        dispatch(saveNewTaskStart());

        try {
            const { data } = await axios.post('/tasks.json', task);
            task = {...task, id: data.name};
            console.log(data.name);
            dispatch(saveNewTaskSuccess(task));
        }
        catch (err) {
            console.log('err', err);
            console.log(JSON.stringify(err, null, '\t'));
            const message = err.response ? err.response.data.error : err.message
            dispatch(saveNewTaskFail(message));
        }
    };
};

const saveNewTaskStart = () => {
    return {
        type: actionTypes.SAVE_NEW_TASK_START
    };
};

const saveNewTaskSuccess = (task) => {
    return {
        type: actionTypes.SAVE_NEW_TASK_SUCCESS,
        task
    };
};

const saveNewTaskFail = (error) => {
    return {
        type: actionTypes.SAVE_NEW_TASK_FAIL,
        error
    };
};

export const setRedirectFromNewTaskScreen = (redirect) => {
    return {
        type: actionTypes.SET_REDIRECT_FROM_NEW_TASK_SCREEN,
        redirect
    };
};