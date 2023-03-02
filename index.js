const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Modules.Director;

mongoose.connect('mongodb://localhost:8080/[movie', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

app.use(bodyParser.json());

app.use(morgan('common'));

// default text response 
app.get('/', (request, response) => {
  response.send('Welcome to my Movie database!')
});






//READ all movies
app.get('/movies', (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//READ movie by Title
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//READ movie by Genre
app.get('/genre/:Name', (req, res) => {
  Genres.findOne({ Name: req.params.Name })
  .then((genre) => {
    res.json(genre.Description);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

//READ movie by Director
app.get('/director/:Name', (req, res) => {
  Directors.findOne({ Name: req.params.Name })
  .then((director) => {
    res.json(director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


// Get all users
app.get('/users', (req, res) => {
  Users.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//Get user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
  .then((user) => {
    res.json(user);
  })
  .catch((er) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


//CREATE
/*{
ID: Integer,
Username: String,
Password: String,
Email: String, 
Birthday: Date
}*/



//CREATE
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
            } else {
              Users
                .create({
                  Username: req.body.Username,
                  Password: req.body.Password,
                  Email: req.body.Email,
                  Birthday: req.body.Birthday
                })
                .then((user) => {res.status(201).json(user) })
                .catch((error) => {
                  console.error(error);
                  res.status(500).send('Error: ' + error);
                })
            }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ', error);
    });
});

//UPDATE
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate(
    {Username: req.params.Username },
    {
      $set: {
        Username: req.params.Username,
        Password: req.params.Password,
        Email: req.params.Email,
        Birthday: req.params.Birthday,
      },
    },
    { new: true }, 
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});


//DELETE
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then((user) => {
    if (!user) {
      res.status(400).send(req.params.Username + 'was not found');
    } else {
      res.status(200).send(req.params.Username + 'was deleted');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


app.use(express.static('public'));
app.use(morgan('common'));

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

//Handling Errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Oh, something went worng. Please try again later.");
});