const express = require('express');

morgan = require('morgan');

const app = express();

app.use(morgan('common'));

let topMovies = [
  {
    title: 'Iron Man',
    author: 'Marvel Cinematic Universe'
  },
  {
    title: 'The Incredible Hulk',
    author: 'Marvel Cinmematic Universe' 
  },
  {
    title: 'Iron Man 2',
    author: 'Marvel Cinmematic Universe'
  },
  {
    title: 'Thor',
    author: 'Marvel Cinmematic Universe'
  },
  {
    title: 'Captain America: The First Avenger',
    author: 'Marvel Cinmematic Universe'
  },
  {
    title: 'Marvel\'s The First Avengers',
    author: 'Marvel Cinmematic Universe'
  },
  {
    title: 'Iron Man 3',
    author: 'Marvel Cinmematic Universe'
  },
  {
    title: 'Thor: The Dark World',
    author: 'Marvel Cinmematic Universe'
  },
  {
    title: 'Captain America: The Winter Soldier',
    author: 'Marvel Cinmematic Universe'
  },
  {
    title: 'Gaurdians of the Galaxy',
    author: 'Marvel Cinmematic Universe'
  },
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my Movie API site!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});