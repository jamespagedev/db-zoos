/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
const express = require('express');
const db = require('../../data/dbConfig.js');

const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
// None

/***************************************************************************************************
 ********************************************** routes *********************************************
 **************************************************************************************************/
// /api/bears (get multi)
router.get('/', (req, res) => {
  db('bears')
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => res.status(500).json(err));
});

// /api/bears/:id (get single)
router.get('/:id', (req, res) => {
  db('bears')
    .where({ id: req.params.id })
    .then(bear => {
      if (bear.length !== 0) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({ error: 'bear not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

// /api/bears (create)
router.post('/', (req, res) => {
  // db.insert(req.body).into('bears').then().catch();
  // or
  db('bears')
    .insert(req.body)
    .then(ids => {
      res.status(201).json(ids);
    }).catch(err => res.status(500).json(err));
});

// /api/bears/:id (delete)
router.delete('/:id', (req, res) => {
  db('bears')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ error: `bear with ID '${req.params.id}' not found` });
      }
    }).catch(err => res.status(500).json(err));
})

// /api/bears/:id (edit)
router.put('/:id', (req, res) => {
  const changes = req.body;

  db('bears')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ error: `bear with ID '${req.params.id}' not found` });
      }
    }).catch(err => res.status(500).json(err));
})

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;
