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
        res.status(404).json({ error: 'Zoo not found' })
      }
    })
    .catch(err => res.status(500).json(err));
});

// /api/zoos (create)

// /api/zoos/:id (delete)

// /api/zoos/:id (edit)

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;
