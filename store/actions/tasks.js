import axios from '../../axios/axios';
import * as actionTypes from './actionTypes';
import getErrorMessage from '../../Utils/getErrorMessage';

export const fetchTasks = (forCompleted = false) => {
    return async (dispatch, getState) => {
        dispatch(fetchTasksStart(forCompleted));
        const { token, userId } = getState().auth;
        if (!token) {
            debugger;
        }
        const url = `/tasks/${userId}.json?orderBy="isCompleted"&equalTo=${forCompleted}&auth=${token}`;
        try {
            console.log('fetching tasks: ', `userId: ${userId}, token: ${token !== null ? token.substr(0, 10) + '...' : token}`);
            const { data } = await axios.get(url);
            if (typeof data !== 'object') {
                throw new Error('Wrong response type.');
            }
            dispatch(fetchTasksSuccess(data || {}, forCompleted));
        }
        catch (err) {
            const message = err.response ? err.response.data.error : err.message
            dispatch(fetchTasksFail(message, forCompleted));
        }
    };
};

const fetchTasksStart = (forCompleted) => {
    return {
        type: actionTypes.FETCH_TASKS_START,
        forCompleted
    };
};

const fetchTasksSuccess = (tasks, forCompleted) => {
    return {
        type: actionTypes.FETCH_TASKS_SUCCESS,
        tasks,
        forCompleted
    };
};

const fetchTasksFail = (error, forCompleted) => {
    return {
        type: actionTypes.FETCH_TASKS_FAIL,
        error,
        forCompleted
    };
};

export const toggleComplete = (id, markAsCompleted) => {
    return async (dispatch, getState) => {
        const { token, userId } = getState().auth;
        dispatch(toggleCompleteStart(id));
        const url = `/tasks/${userId}/${id}.json?auth=${token}`;
        const completeDate = markAsCompleted ? new Date().toISOString() : null;
        setTimeout(async () => {
            try {
                console.log('completing task')
                await axios.patch(url, {
                    isCompleted: markAsCompleted,
                    completedAt: completeDate
                });
                dispatch(toggleCompleteSuccess(id, markAsCompleted, completeDate));
            }
            catch (err) {
                const message = `Sorry, could not mark task as ${markAsCompleted
                    ? 'completed'
                    : 'pending'}.\nPlease, refresh and try again.`;
                dispatch(toggleCompleteFail(message, id, markAsCompleted));
            }
        }, 233);
    }
};

const toggleCompleteStart = (id) => {
    return {
        type: actionTypes.TOGGLE_COMPLETE_START,
        id
    };
};

const toggleCompleteSuccess = (id, markAsCompleted, completeDate) => {
    return {
        type: actionTypes.TOGGLE_COMPLETE_SUCCESS,
        id,
        markAsCompleted,
        completeDate
    };
};

const toggleCompleteFail = (error, id, markAsCompleted) => {
    return {
        type: actionTypes.TOGGLE_COMPLETE_FAIL,
        error,
        id,
        markAsCompleted
    };
};

export const refreshTasks = (forCompleted = false) => {
    return async (dispatch, getState) => {
        dispatch(refreshTasksStart(forCompleted));
        const { token, userId } = getState().auth;
        const url = `/tasks/${userId}.json?orderBy="isCompleted"&equalTo=${forCompleted}&auth=${token}`;
        try {
            console.log('refreshing tasks')
            const { data } = await axios.get(url);
            if (typeof data !== 'object') {
                throw new Error('Wrong response type.');
            }
            dispatch(refreshTasksSuccess(data || {}, forCompleted));
        }
        catch (err) {
            const message = err.response ? err.response.data.error : err.message
            dispatch(refreshTasksFail(message, forCompleted));
        }
    };
};

const refreshTasksStart = (forCompleted) => {
    return {
        type: actionTypes.REFRESH_TASKS_START,
        forCompleted
    };
};

const refreshTasksSuccess = (tasks, forCompleted) => {
    return {
        type: actionTypes.REFRESH_TASKS_SUCCESS,
        tasks,
        forCompleted
    };
};

const refreshTasksFail = (error, forCompleted) => {
    return {
        type: actionTypes.REFRESH_TASKS_FAIL,
        error,
        forCompleted
    };
};

export const saveNewTask = (task) => {
    return async (dispatch, getState) => {
        const { token, userId } = getState().auth;
        dispatch(saveNewTaskStart());

        try {
            console.log('new task')
            const { data } = await axios.post(`/tasks/${userId}.json?auth=${token}`, task);
            task = { ...task, id: data.name };
            dispatch(saveNewTaskSuccess(task));
        }
        catch (err) {
            dispatch(
                saveNewTaskFail(
                    getErrorMessage(err)
                )
            );
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

export const deleteTask = (id, isCompleted) => {
    return async (dispatch, getState) => {
        const { token, userId } = getState().auth;
        dispatch(deleteTaskStart(id));
        console.log('delete task')
        const url = `/tasks/${userId}/${id}?auth=${token}.json`;
        try {
            await axios.delete(url);
            dispatch(deleteTaskSuccess(id, isCompleted));
        }
        catch (err) {
            const message = err.response ? err.response.data.error : err.message
            dispatch(deleteTaskFail(message, id));
        }
    };
};

const deleteTaskStart = (id) => {
    return {
        type: actionTypes.DELETE_TASK_START,
        id
    };
};

const deleteTaskSuccess = (id, isCompleted) => {
    return {
        type: actionTypes.DELETE_TASK_SUCCESS,
        id,
        isCompleted
    };
};

const deleteTaskFail = (error, id) => {
    return {
        type: actionTypes.DELETE_TASK_FAIL,
        id,
        error
    };
};