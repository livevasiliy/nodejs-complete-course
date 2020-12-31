const path = require('path');

const express = require('express');

const app = express();

const webRoutes = require('./routes/web');

app.use(express.static(path.join(__dirname, 'public')))

app.use(webRoutes);

app.listen(3000);