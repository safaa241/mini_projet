const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    status: { type: String, enum: ['pending', 'completed'], required: true },
});

module.exports = mongoose.model('Task', taskSchema);
