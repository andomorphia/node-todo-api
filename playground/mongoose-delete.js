const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.deleteMany({}).then(res => {
//   console.log(res);
// });

// Todo.findOneAndDelete({ _id: '5bcc51617a6425661c01bbd8'}).then(todo => {
//   console.log(todo);
// })

Todo.findByIdAndDelete('5bcc51617a6425661c01bbd8').then(todo => {
  console.log(todo);
});
