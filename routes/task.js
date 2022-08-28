const express = require('express');
const Task = require('../models/task');

const router = express.Router();

router.get('/', (req, res) => {
  Task.find({}, (err, tasks) => {
    if (tasks) res.json(tasks);
    else res.json({ error: err });
  });
});
router.get('/:id', (req, res) => {
  Task.findOne({ _id: req.params.id }, (err, task) => {
    if (task) res.json(task);
    else res.json({ error: err });
  });
});
router.post('/', (req, res) => {
  const task = new Task(req.body);
  task.save()
    .then((createdTask) => res.json(createdTask))
    .catch((err) => res.json(err));
});
router.put('/:id', (req, res) => {
  Task.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((updatedTask) => res.json(updatedTask))
    .catch((err) => res.json(err));
});
router.delete('/:id', (req, res) => {
  Task.findOneAndDelete({ _id: req.params.id })
    .then((deletedTask) => res.json(deletedTask))
    .catch((err) => res.json(err));
});

module.exports = router;
