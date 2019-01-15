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
// /api/zoos (get multi)
router.get('/', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// /api/zoos/:id (get single)
router.get('/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .then(zoo => {
      if (zoo.length !== 0) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ error: 'Zoo not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

// /api/zoos (create)
router.post('/', (req, res) => {
  // db.insert(req.body).into('zoos').then().catch();
  // or
  db('zoos')
    .insert(req.body)
    .then(ids => {
      res.status(201).json(ids);
    }).catch(err => res.status(500).json(err));
});

// /api/zoos/:id (delete)
router.delete('/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ error: `Zoo with ID '${req.params.id}' not found` });
      }
    }).catch(err => res.status(500).json(err));
})

// /api/zoos/:id (edit)
router.put('/:id', (req, res) => {
  const changes = req.body;

  db('zoos')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ error: `Zoo with ID '${req.params.id}' not found` });
      }
    }).catch(err => res.status(500).json(err));
})

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;
