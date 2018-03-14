// const knex = require('../knex');

// knex.select(1).then(res => console.log(res));

// knex.select('id', 'title', 'content')
//   .from('notes')
//   .where('title', 'like', '%lessons%')
//   .then(console.log)
//
//
// knex('notes')
//   .where({id: '1002'})
//   .then(console.log)

// const newInfo = { title: 'Hello', content: 'World'}
//
// knex('notes')
//   .update(newInfo)
//   .where({id: '1002'})
//   .then(console.log)

// const newInfo = { title: 'Hello', content: 'World'}
//
// knex
//   .insert([newInfo])
//   .into('notes')
//   .returning(['id', 'title'])
//   .then(console.log)

// knex('notes')
//   .where({id: '1007'})
//   .del()
//   .then(console.log)
