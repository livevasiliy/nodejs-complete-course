const express = require('express');

const app = expres();

// For second task

// app.use((req, res, next) => {
//   console.log('Run first middleware');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Run second middleware');
//   res.send('<p>Hello world !</p>);
// })

// For third task
app.use('/users', (req, res, next) => {
  console.log('/users middleware');
  res.send('<ul><li>User 1 </li><li>User 2</li></ul>');
});

app.use('/', (req, res, next) => {
  console.log('/ middleware');
  res.send('<h1>Hello Express.js</h1>');
});

app.listen(3000);