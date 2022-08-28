const mongoose = require('mongoose');

const { Schema } = mongoose;

const DeptSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  deptCode: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Dept = mongoose.model('Dept', DeptSchema);

module.exports = Dept;
