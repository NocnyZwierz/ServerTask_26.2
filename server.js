const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
    res.show = (name) => {
      res.sendFile(path.join(__dirname, `/views/${name}`));
    };
    next();
  });

  app.use('/user/', (req, res, next) => {
    if (req.path === '/settings' || req.path === '/panel') {
      res.show('forbidden.html');
    } else {
      next();
    }
  });

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.show('home.html');
  });

app.get('/home', (req, res) => {
res.show('home.html');
});

app.get('/about', (req, res) => {
    res.show('about.html');
});

app.use((req, res) => {
    res.show('404.html');
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });