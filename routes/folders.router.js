'use strict';
const express = require('express');

const router = express.Router();
const knex = require('../knex.js');

router.get('/folders', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

router.get('/folders/:id', (req, res, next) => {
  const foldersID = req.params.id;
  knex('folders')
    .where({id: foldersID})
    .then(results => {
      res.json(results)
    })
    .catch( err => next(err) )
});

// put

router.put('/folders/:id', (req, res, next) => {
  const foldersId = req.params.id;
  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableField = 'name';

  // if (updateableField in req.body) {
  //   updateObj.name = req.body[name];
  // }
 updateObj.name = req.body.name;
  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex('folders')
    .update(updateObj)
    .where({id: foldersId})
    .returning('name')
    .then(item => {
      if(item){
          res.json(item)
      }
    })
    .catch( err => next(err) )
});

//POST

router.post('/folders', (req, res, next) => {
  const { name } = req.body;

  const newItem = { name };
  /***** Never trust users - validate input *****/
  if (!newItem.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex
    .insert([newItem])
    .into('folders')
    .returning(['name'])
    .then(item => {
      if (item) {
        res.location(`http://${req.headers.host}/folders/${item.id}`).status(201).json(item);
      }
    })
    .catch(err => next(err));
});

//Delete

router.delete('/folders/:id', (req, res, next) => {
  const id = req.params.id;

  knex('folders')
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
