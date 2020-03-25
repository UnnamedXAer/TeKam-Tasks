import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pending: [],
    completed: [],
    loading: true,
    error: null,
    refreshing: false,

    compleatedLoading: true,
    compleatedError: null,
    compleatedRefreshing: false,

    activeFilters: {},
    sortOptions: {},
    tasksLoading: {},
    tasksErrors: {},

    newTaskLoading: false,
    newTaskError: null,
    newTaskRedirect: false
};

const fetchTasksStart = (state, action) => {

    if (action.forCompleted) {
        return {
            ...state,
            compleatedLoading: true,
            compleatedError: null,
            compleatedRefreshing: false
        };
    }

    return {
        ...state,
        loading: true,
        error: null,
        refreshing: false
    };
};

const fetchTasksSuccess = (state, action) => {
    const { tasks, forCompleted } = action;

    const dbIds = Object.keys(tasks);
    const updatedTasks = [];
    const updatedTasksErrors = { ...state.tasksErrors };
    dbIds.forEach(id => {
        if (updatedTasksErrors[id]) {
            updatedTasksErrors[id] = false;
        }
        updatedTasks.push({ ...tasks[id], id });
    });

    if (forCompleted) {
        return {
            ...state,
            completed: updatedTasks,
            compleatedLoading: false,
            compleatedError: null,
            compleatedRefreshing: false,
            tasksErrors: updatedTasksErrors
        };
    }

    return {
        ...state,
        pending: updatedTasks,
        loading: false,
        error: null,
        refreshing: false,
        tasksErrors: updatedTasksErrors
    };
};

const fetchTasksFail = (state, action) => {

    if (action.forCompleted) {
        return {
            ...state,
            completed: [],
            compleatedLoading: false,
            compleatedError: action.error,
            compleatedRefreshing: false
        };
    }

    return {
        ...state,
        pending: [],
        loading: false,
        error: action.error,
        refreshing: false
    };
};

const toggleCompleteStart = (state, action) => {
    const { id } = action;
    return {
        ...state,
        tasksErrors: { ...state.tasksErrors, [id]: null },
        tasksLoading: { ...state.tasksLoading, [id]: true }
    };
};

const toggleCompleteSuccess = (state, action) => {
    const { id, markAsCompleted, completeDate } = action;
    let updatedCompletedTasks = [];
    let updatedPendingTasks = [];

    if (markAsCompleted) { // was pending will be completed 
        const task = state.pending.find(x => x.id === id);

        task.isCompleted = markAsCompleted;
        task.completedAt = completeDate;
        updatedPendingTasks = state.pending.filter(x => x.id !== id);
        updatedCompletedTasks = state.completed.concat(task);
    }
    else {
        const task = state.completed.find(x => x.id === id);

        task.isCompleted = markAsCompleted;
        task.completedAt = completeDate;
        updatedCompletedTasks = state.completed.filter(x => x.id !== id);
        updatedPendingTasks = state.pending.concat(task);
    }

    return {
        ...state,
        tasksErrors: { ...state.tasksErrors, [id]: null },
        tasksLoading: { ...state.tasksLoading, [id]: false },
        completed: updatedCompletedTasks,
        pending: updatedPendingTasks
    };
};

const toggleCompleteFail = (state, action) => {
    const { id, error } = action;
    return {
        ...state,
        tasksErrors: { ...state.tasksErrors, [id]: error },
        tasksLoading: { ...state.tasksLoading, [id]: false }
    };
};

const refreshTasksStart = (state, action) => {
    if (action.forCompleted) {
        return {
            ...state,
            compleatedLoading: false,
            compleatedRefreshing: true
        };
    }

    return {
        ...state,
        loading: false,
        refreshing: true
    };
};

const refreshTasksSuccess = (state, action) => {
    return fetchTasksSuccess(state, action);
};

const refreshTasksFail = (state, action) => {
    return fetchTasksFail(state, action);
}

const saveNewTaskStart = (state, action) => {
    return {
        ...state,
        newTaskLoading: true,
        newTaskError: null,
        newTaskRedirect: false
    };
};

const saveNewTaskSuccess = (state, action) => {
    const { task } = action;
    const updatedPendingTasks = state.pending.concat(task);
    return {
        ...state,
        newTaskLoading: false,
        newTaskError: null,
        newTaskRedirect: true,
        pending: updatedPendingTasks,

        loading: false,
        error: null,
        refreshing: false
    };
};

const saveNewTaskFail = (state, action) => {
    return {
        ...state,
        newTaskLoading: false,
        newTaskError: action.error,
        newTaskRedirect: false
    };
};

const setRedirectFromNewTaskScreen = (state, action) => {
    return {
        ...state,
        newTaskRedirect: action.redirect
    };
};

const deleteTaskStart = (state, action) => {
    const { id } = action;
    return {
        ...state,
        tasksErrors: { ...state.tasksErrors, [id]: null },
        tasksLoading: { ...state.tasksLoading, [id]: true }
    };
};

const deleteTaskSuccess = (state, action) => {
    const { id, isCompleted } = action;
    const updatedState = {
        ...state,
        tasksErrors: { ...state.tasksErrors, [id]: null },
        tasksLoading: { ...state.tasksLoading, [id]: true }
    };

    if (isCompleted) {
        updatedState.completed = updatedState.completed.filter(x => x.id !== id);
    }
    else {
        updatedState.pending = updatedState.pending.filter(x => x.id !== id);
    }

    return updatedState;
}

const deleteTaskFail = (state, action) => {
    const { id, error } = action;
    return {
        ...state,
        tasksErrors: { ...state.tasksErrors, [id]: error },
        tasksLoading: { ...state.tasksLoading, [id]: false }
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TASKS_START: return fetchTasksStart(state, action);
        case actionTypes.FETCH_TASKS_SUCCESS: return fetchTasksSuccess(state, action);
        case actionTypes.FETCH_TASKS_FAIL: return fetchTasksFail(state, action);

        case actionTypes.TOGGLE_COMPLETE_START: return toggleCompleteStart(state, action);
        case actionTypes.TOGGLE_COMPLETE_SUCCESS: return toggleCompleteSuccess(state, action);
        case actionTypes.TOGGLE_COMPLETE_FAIL: return toggleCompleteFail(state, action);

        case actionTypes.REFRESH_TASKS_START: return refreshTasksStart(state, action);
        case actionTypes.REFRESH_TASKS_SUCCESS: return refreshTasksSuccess(state, action);
        case actionTypes.REFRESH_TASKS_FAIL: return refreshTasksFail(state, action);

        case actionTypes.SAVE_NEW_TASK_START: return saveNewTaskStart(state, action);
        case actionTypes.SAVE_NEW_TASK_SUCCESS: return saveNewTaskSuccess(state, action);
        case actionTypes.SAVE_NEW_TASK_FAIL: return saveNewTaskFail(state, action);

        case actionTypes.SET_REDIRECT_FROM_NEW_TASK_SCREEN:
            return setRedirectFromNewTaskScreen(state, action);

        case actionTypes.DELETE_TASK_START: return deleteTaskStart(state, action);
        case actionTypes.DELETE_TASK_SUCCESS: return deleteTaskSuccess(state, action);
        case actionTypes.DELETE_TASK_FAIL: return deleteTaskFail(state, action);

        default:
            return state;
    };
};

export default reducer;