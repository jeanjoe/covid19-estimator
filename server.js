const express = require('express');
const path = require('path');
const compression = require('compression');

const port = process.env.PORT || 5000;
const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => res.render('src/index.html'));

app.listen(port);
