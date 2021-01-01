const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const webRoutes = require('./routes/web');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(webRoutes);

app.listen(3000);