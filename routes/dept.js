const express = require('express');
const Dept = require('../models/department');

const router = express.Router();

router.get('/', (req, res) => {
  Dept.find({}, (err, depts) => {
    if (depts) res.send(depts);
    else res.json({ error: err });
  });
});
router.post('/', (req, res) => {
  const dept = new Dept(req.body);
  dept.save((err, createdDept) => {
    if (createdDept) {
      res.status(201);
      res.json(createdDept);
      return;
    }
    if (err) {
      res.status(400);
      res.json({ error: err });
    }
  });
});
router.put('/:id', (req, res) => {
  Dept.findOneAndUpdate({ _id: req.params.id }, req.body, {}, (err, updatedDept) => {
    if (err) {
      res.status(400);
      res.json({ error: err });
      return;
    }
    if (!updatedDept) {
      res.status(404);
      res.end();
      return;
    }
    res.status(200);
    res.json(updatedDept);
    res.end();
  });
  // .then((updatedDept) => res.json(updatedDept))
  // .catch((err) => res.json(err));
});
router.delete('/:id', (req, res) => {
  Dept.findOneAndDelete({ _id: req.params.id }, (err, deletedDept) => {
    if (err) {
      res.status(400);
      res.json({ error: err });
      return;
    }
    if (!deletedDept) {
      res.status(404);
      res.end();
      return;
    }
    res.status(200);
    res.json(deletedDept);
    res.end();
  });
  // .then((deletedDept) => res.json(deletedDept))
  // .catch((err) => res.json(err));
});

module.exports = router;
