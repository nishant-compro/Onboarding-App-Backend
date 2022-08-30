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
    if (err) {
      res.status(400);
      res.json({ error: err });
      return;
    }
    if (!task) {
      res.status(404);
      res.end();
      return;
    }
    res.status(200);
    res.json(task);
    res.end();
  });
});
router.post('/', (req, res) => {
  const task = new Task(req.body);
  task.save((err, createdTask) => {
    if (createdTask) {
      res.status(201);
      res.json(createdTask);
      return;
    }
    if (err) {
      res.status(400);
      res.json({ error: err });
    }
  });
});
router.put('/:id', (req, res) => {
  Task.findOneAndUpdate({ _id: req.params.id }, req.body, {}, (err, updatedTask) => {
    if (err) {
      res.status(400);
      res.json({ error: err });
      return;
    }
    if (!updatedTask) {
      res.status(404);
      res.end();
      return;
    }
    res.status(200);
    res.json(updatedTask);
    res.end();
  });
});
router.delete('/:id', (req, res) => {
  Task.findOneAndDelete({ _id: req.params.id }, {}, (err, deletedTask) => {
    if (err) {
      res.status(400);
      res.json({ error: err });
      return;
    }
    if (!deletedTask) {
      res.status(404);
      res.end();
      return;
    }
    res.status(200);
    res.json(deletedTask);
    res.end();
  });
});

module.exports = router;
