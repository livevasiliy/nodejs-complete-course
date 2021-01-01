const express = require('express');

const router = express.Router();

const users = [];

router.get('/', (req, res, next) => {
  res.render('index', {
    pageTitle: 'Home page',
    path: '/'
  });
});

router.get('/users', (req, res, next) => {
  res.render('users', {
    pageTitle: 'Users',
    users,
    path: '/users'
  });
});

router.post('/add-user', (req, res, next) => {
  users.push({
    name: req.body.name
  });
  res.redirect('/users');
});

module.exports = router;