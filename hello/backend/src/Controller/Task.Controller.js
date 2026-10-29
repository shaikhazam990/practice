import TaskModel from '../Model/Task.model.js';

const sendError = (res, error) => {
    const status = error.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ error: error.message });
};

export const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, tags } = req.body;
        const task = await TaskModel.create({ title, description, priority, dueDate, tags });
        res.status(201).json(task);
    } catch (error) {
        sendError(res, error);
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        sendError(res, error);
    }
};

export const getTaskById = async (req, res) => {
    try {
        const task = await TaskModel.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        sendError(res, error);
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, description, completed, priority, dueDate, tags } = req.body;
        const task = await TaskModel.findByIdAndUpdate(
            req.params.id,
            { title, description, completed, priority, dueDate, tags },
            { new: true, runValidators: true, omitUndefined: true }
        );
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        sendError(res, error);
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await TaskModel.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        sendError(res, error);
    }
};

export default { createTask, getTasks, getTaskById, updateTask, deleteTask };