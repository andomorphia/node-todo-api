const express = require('express');
const router = express.Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { authenticate } = require('./../middleware/authenticate');

router.post('/todos', authenticate, async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id,
  });

  try {
    const doc = await todo.save();
    res.send(doc);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/todos', authenticate, async (req, res) => {
  try {
    const todos = await Todo.find({ _creator: req.user._id });
    res.send({ todos });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/todos/:id', authenticate, async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    const todo = await Todo.findOne({ _id: id, _creator: req.user._id });

    if (!todo) {
      return res.status(404).send();
    }

    res.send({ todo });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/todos/:id', authenticate, async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    const todo = await Todo.findOneAndDelete({
      _id: id,
      _creator: req.user._id,
    });

    if (!todo) {
      return res.status(404).send();
    }

    res.send({ todo });
  } catch (err) {
    res.status(404).send();
  }
});

router.patch('/todos/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = Date.now();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, _creator: req.user._id },
      { $set: body },
      { new: true }
    );

    if (!todo) {
      return res.status(404).send();
    }

    res.send({ todo });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/users', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();

    res.header('x-auth', token).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();

    res.header('x-auth', token).send(user);
  } catch (err) {
    res.status(400).send();
  }
});

router.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

router.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
});

module.exports = router;
