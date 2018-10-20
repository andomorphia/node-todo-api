// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server', err);
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Users')
    //   .deleteMany({ name: 'Jonathan' })
    //   .then(res => {
    //     console.log(res);
    //   });

    // deleteOne
    // db.collection('Todos')
    //   .deleteOne({ text: 'Eat lunch' })
    //   .then(res => {
    //     console.log(res);
    //   });

    // findOneAndDelete
    db.collection('Users')
      .findOneAndDelete({ _id: new ObjectID('5bc8ea2697b32df7b381574b') })
      .then(res => {
        console.log(res);
      });

    // client.close();
  }
);
