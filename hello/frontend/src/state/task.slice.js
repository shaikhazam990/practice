import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

const startLoading = (state) => {
    state.loading = true;
    state.error = null;
};

const setError = (state, action) => {
    state.loading = false;
    state.error = action.payload; 
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        fetchTasksStart: startLoading,
        fetchTasksSuccess: (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        },
        fetchTasksFailure: setError,

        addTaskStart: startLoading,
        addTaskSuccess: (state, action) => {
            state.loading = false;
            state.tasks.unshift(action.payload);
        },
        addTaskFailure: setError,

        removeTaskStart: startLoading,
        removeTaskSuccess: (state, action) => {
            state.loading = false;
            state.tasks = state.tasks.filter((t) => t._id !== action.payload);
        },
        removeTaskFailure: setError,

        updateTaskStart: startLoading,
        updateTaskSuccess: (state, action) => {
            state.loading = false;
            state.tasks = state.tasks.map((t) =>
                t._id === action.payload._id ? action.payload : t
            );
        },
        updateTaskFailure: setError,

        deleteTaskStart: startLoading,
        deleteTaskSuccess: (state, action) => {
            state.loading = false;
            state.tasks = state.tasks.filter((t) => t._id !== action.payload);
        },
        deleteTaskFailure: setError,
    },
});

export const {
    fetchTasksStart, fetchTasksSuccess, fetchTasksFailure,
    addTaskStart, addTaskSuccess, addTaskFailure,
    removeTaskStart, removeTaskSuccess, removeTaskFailure,
    updateTaskStart, updateTaskSuccess, updateTaskFailure,
    deleteTaskStart, deleteTaskSuccess, deleteTaskFailure,
} = taskSlice.actions;

export default taskSlice.reducer;