const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  assignee: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Dept',
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  completedAt: {
    type: String,
  },
  remarks: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
