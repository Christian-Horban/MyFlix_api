const express = require('express'),
  bodyParser = require('body-parser')

const morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models');

const Movies = Models.Movie;
const Users = Models.User;

/*
const Genres = Models.Genre;
const Directors = Modules.Director;
*/

mongoose.connect("mongodb+srv://xian831:NewPort831@myflixdb.1iarcgk.mongodb.net/myFlixDB?retryWrites=true&w=majority",{ 
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => {
  console.log("DB Connection Error: ", err);
});

// mongoose.connect("mongodb://0.0.0.0:27017/[movie",{ 
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const app = express();
app.use(express.static('public'));
app.use(morgan('common'));



// mongoose.connect('mongodb://localhost:27017/[movie', { 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true 
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

// const cors = require('cors');
//   let allowedOrigins = ['http://localhost:8080', 'http://localhost:1234', /*'https://git.heroku.com/horban-movie-api.git', "https://myflix-horban.netlify.app"*/];
// //  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'];

// app.use(cors({
//   origin: (origin, callback) => {
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin)===-1) {
//       let message = 'The CORS policy for this application doesn\'t allow access from origin ' + origin;
//       return callback(new Error(message),false);
//     }
//     return callback(null, true);
//   }
// }));

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

const { check, validationResult } = require('express-validator');


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
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
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
app.get('/genre/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
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
app.get('/director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
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
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.post(
  '/users',
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check(
      'Username',
      'Username contains non alphanumeric characters - not allowed.'
    ).isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
  ],
  (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Models.User.hashPassword(req.body.Password);
    //let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res
            .status(400)
            .send(req.body.Username + 'already exists');
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);

//UPDATE
app.put(
  '/users/:Username',
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check(
      'Username',
      'Username contains non alphanumeric characters - not allowed.'
    ).isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
  ],
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }
    )
      .then((updatedUser) => {
        res.status(200).json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// Allow users to add a movie to their list of top movies
app.post(
  '/users/:Username/FavoriteMovies/:movieid',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const {Username, movieid: movieId} = req.params;
    Users.findOne({Username: Username, FavoriteMovies: movieId})
      .then((movieIsPresent) => {
        if (movieIsPresent) {
          return res.status(409).send('Movie is already on your list.');
        }

        Users.findOneAndUpdate(
          {Username: Username},
          {$addToSet: {FavoriteMovies: movieId}},
          {new: true}
        )
          .then((updatedUser) => {
            res.status(200).json({
              message: 'Movie was successfully added',
              user: updatedUser,
            });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send(`Error: '${error}`);
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(`Error: ${error}`);
      });
  }
);

// Allow users to remove a movie from their list of top movies
app.delete(
  '/users/:Username/FavoriteMovies/:movieid',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const {Username, movieid: movieId} = req.params;
    Users.findOne({Username: Username, FavoriteMovies: movieId})
      .then((movieIsPresent) => {
        if (!movieIsPresent) {
          return res.status(200).send('Movie is not in your list.');
        }

        Users.findOneAndUpdate(
          {Username: Username},
          {$pull: {FavoriteMovies: movieId}},
          {new: true}
        )
          .then((updatedUser) => {
            res.status(200).json({
              message: 'Movie was successfully removed',
              user: updatedUser,
            });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send(`Error: ${error}`);
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(`Error: ${error}`);
      });
  }
);


//DELETE
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
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



// GET requests

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

//Handling Errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Oh, something went worng. Please try again later.");
});

// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});

