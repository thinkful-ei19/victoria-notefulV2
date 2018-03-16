'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex.js');

/* ========== POST/CREATE ITEM ========== */
router.post('/tags', (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = { name };

  knex.insert(newItem)
    .into('tags')
    .returning(['id', 'name'])
    .then(([result]) => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));
});

/* ========== GET/READ ALL NOTES ========== */
router.get('/tags', (req, res, next) => {
  knex.select('id', 'name')
    .from('tags')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
  });
/* ========== GET/READ SINGLE NOTES ========== */
  router.get('/tags/:id', (req, res, next) => {
    const tagsID = req.params.id;
    knex('tags')
      .where({id: tagsID})
      .then(results => {
        res.json(results)
      })
      .catch( err => next(err) )
  });
/* ========== PUT/UPDATE A SINGLE ITEM ========== */
  router.put('/tags/:id', (req, res, next) => {
    const tagsId = req.params.id;
    const updateObj = {};
    const updateableField = 'name';

   updateObj.name = req.body.name;

    if (!updateObj.name) {
      const err = new Error('Missing `name` in request body');
      err.status = 400;
      return next(err);
    }

    knex('tags')
      .update(updateObj)
      .where({id: tagsId})
      .returning('name')
      .then(item => {
        if(item){
            res.json(item)
        }
      })
      .catch( err => next(err) )
  });


  router.delete('/tags/:id', (req, res, next) => {
    const id = req.params.id;

    knex('tags')
      .where({id: id})
      .del()
      .then(count => {
        if (count) {
          res.status(204).end();
        } else {
          next();
        }
      })
      .catch(err => next(err));
  });



module.exports = router;
