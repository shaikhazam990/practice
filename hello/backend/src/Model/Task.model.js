import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,    
        required: true
    },
    description: {
        type: String,
        required: true  
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date,
        required: false
    },
    tags: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;