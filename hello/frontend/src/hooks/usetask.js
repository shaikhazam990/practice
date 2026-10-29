import {
    fetchTasksStart, fetchTasksFailure, fetchTasksSuccess,
    addTaskStart, addTaskSuccess, addTaskFailure,
    removeTaskStart, removeTaskSuccess, removeTaskFailure,
    updateTaskStart, updateTaskSuccess, updateTaskFailure,
    deleteTaskStart, deleteTaskSuccess, deleteTaskFailure
} from "../state/task.slice.js";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import taskApi from "../service/task.api.js";

const useTask = () => {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.task);

    const fetchTasks = useCallback(async () => {
        dispatch(fetchTasksStart());
        try {
            const data = await taskApi.getTasks();
            dispatch(fetchTasksSuccess(data));
        } catch (err) {
            dispatch(fetchTasksFailure(err.message));
        }
    }, [dispatch]);

    const addTask = async (task) => {
        dispatch(addTaskStart());
        try {
            const data = await taskApi.addTask(task);
            dispatch(addTaskSuccess(data));
        } catch (err) {
            dispatch(addTaskFailure(err.message));
        }
    };

    const removeTask = async (taskId) => {
        dispatch(removeTaskStart());
        try {
            await taskApi.removeTask(taskId);
            dispatch(removeTaskSuccess(taskId));
        } catch (err) {
            dispatch(removeTaskFailure(err.message));
        }
    };

    const updateTask = async (taskId, updatedTask) => {
        dispatch(updateTaskStart());
        try {
            const data = await taskApi.updateTask(taskId, updatedTask);
            dispatch(updateTaskSuccess(data));
        } catch (err) {
            dispatch(updateTaskFailure(err.message));
        }
    };

    const deleteTask = async (taskId) => {
        dispatch(deleteTaskStart());
        try {
            await taskApi.removeTask(taskId);
            dispatch(deleteTaskSuccess(taskId));
        } catch (err) {
            dispatch(deleteTaskFailure(err.message));
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return { tasks, loading, error, addTask, removeTask, updateTask, deleteTask };
};

export default useTask;