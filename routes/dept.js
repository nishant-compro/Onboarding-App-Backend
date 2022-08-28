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
  dept.save()
    .then((deptRes) => res.json(deptRes))
    .catch((err) => res.json(err));
});
router.put('/:id', (req, res) => {
  Dept.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((updatedDept) => res.json(updatedDept))
    .catch((err) => res.json(err));
});
router.delete('/:id', (req, res) => {
  Dept.findOneAndDelete({ _id: req.params.id })
    .then((deletedDept) => res.json(deletedDept))
    .catch((err) => res.json(err));
});

module.exports = router;
