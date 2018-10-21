const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// const id = '5bcb57ef96acb146dc9e6eb011';

// if (!ObjectID.isValid(id)) {
//   console.log('Id not valid');
// }

// Todo.find({
//   _id: id,
// }).then(todos => {
//   console.log('Todos', JSON.stringify(todos, undefined, 2));
// });

// Todo.findOne({
//   _id: id,
// }).then(todo => {
//   console.log('Todo', JSON.stringify(todo, undefined, 2));
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log('Id not found');
//     }

//     console.log('Todo by Id', JSON.stringify(todo, undefined, 2));
//   })
//   .catch(err => console.log(err));

const id = '5bcb32410ea46c0b8c9946c711';

User.findById(id)
  .then(user => {
    if (!user) {
      return console.log('Id not found');
    }

    console.log('User by Id', JSON.stringify(user, undefined, 2));
  })
  .catch(err => console.log(err));
