import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pending: [],
    completed: [],
    loading: true,
    error: null,
    refreshing: false,
    activeFilters: {},
    sortOptions: {},
    tasksLoading: {},
    tasksErrors: {}
};

const fetchTasksStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        refreshing: false
    };
};

const fetchTasksSuccess = (state, action) => {
    const { tasks } = action;

    const dbIds = Object.keys(tasks);
    const completedTasks = [];
    const pendingTasks = [];
    dbIds.forEach(id => {
        if (tasks[id].isCompleted) {
            completedTasks.push({ ...tasks[id], id });
        }
        else {
            pendingTasks.push({ ...tasks[id], id });
        }
    });

    return {
        ...state,
        pending: pendingTasks,
        completed: completedTasks,
        loading: false,
        error: null,
        refreshing: false
    };
};

const fetchTasksFail = (state, action) => {
    return {
        ...state,
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
    const { id } = action;
    let updatedCompletedTasks = [];
    let updatedPendingTasks = [];
    state.completed.forEach(task => {
        if (task.id === id) {
            updatedPendingTasks.push(task);
        }
        else {
            updatedCompletedTasks.push(task);
        }
    });

    state.pending.forEach(task => {
        if (task.id === id) {
            updatedCompletedTasks.push(task);
        }
        else {
            updatedPendingTasks.push(task);
        }
    });

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
    console.log('refreshTasksStart')
    return {
        ...state,
        loading: false,
        refreshing: true
    };
};

const refreshTasksSuccess = (state, action) => {
    console.log('refreshTasksSuccess')

    return fetchTasksSuccess(state, action);
};

const refreshTasksFail = (state, action) => {
    console.log('refreshTasksFail')
    
    return fetchTasksFail(state, action);
}

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
        default:
            return state;
    };
};

export default reducer;