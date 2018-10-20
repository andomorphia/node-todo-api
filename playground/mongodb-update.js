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

    // findOneAndUpdate
    // db.collection('Todos')
    //   .findOneAndUpdate(
    //     {
    //       _id: new ObjectID('5bcb1ce97dd47978ad509aba'),
    //     },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     },
    //     {
    //       returnOriginal: false,
    //     }
    //   )
    //   .then(res => {
    //     console.log(res);
    //   });

    db.collection('Users')
      .findOneAndUpdate(
        {
          _id: new ObjectID('5bc8ea1297b32df7b3815741'),
        },
        {
          $set: {
            name: 'Jonathan',
            location: 'Grenoble',
          },
          $inc: {
            age: 3,
          },
        },
        {
          returnOriginal: false,
        }
      )
      .then(res => {
        console.log(res);
      });

    // client.close();
  }
);
