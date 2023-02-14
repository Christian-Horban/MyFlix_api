const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

app.use(bodyParser.json());


morgan = require('morgan');


app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.use(morgan('common'));

let movies = [

  {
    "title": "Iron Man",
    "description": "A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.), is conducting weapons tests overseas, but terrorists kidnap him to force him to build a devastating weapon. Instead, he builds an armored suit and upends his captors. Returning to America, Stark refines the suit and uses it to combat crime and terrorism.",
    "release": "May 2, 2008",
    "genre": "Action",
    "director":  {
      "name": "Jon Favreau",
      "bio": "placeholder bio",
      "birth year": "1966"},
},
  {
    "title": "The Incredible Hulk",
    "description": "Scientist Bruce Banner (Edward Norton) desperately seeks a cure for the gamma radiation that contaminated his cells and turned him into The Hulk. Cut off from his true love Betty Ross (Liv Tyler) and forced to hide from his nemesis, Gen. Thunderbolt Ross (William Hurt), Banner soon comes face-to-face with a new threat: a supremely powerful enemy known as The Abomination (Tim Roth).",
    "release": "Jun 13, 2008",
    "genre": " Action",
    "director": {
      "name": "Louis Leterrier",
      "bio": "placeholder bio",
      "birth year": "1973" },
  },
  {
    "title": "Iron Man 2",
    "description": "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and 'Rhodey' Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
    "release": "May 7, 2010",
    "genre": "Action",
    "director": {
      "name": "Jon Favreau",
      "bio": "placeholder bio",
      "birth year": "1973" },
  },
  {
    "title": "Thor",
    "description": "As the son of Odin (Anthony Hopkins), king of the Norse gods, Thor (Chris Hemsworth) will soon inherit the throne of Asgard from his aging father. However, on the day that he is to be crowned, Thor reacts with brutality when the gods' enemies, the Frost Giants, enter the palace in violation of their treaty. As punishment, Odin banishes Thor to Earth. While Loki (Tom Hiddleston), Thor's brother, plots mischief in Asgard, Thor, now stripped of his powers, faces his greatest threat.",
    "release": "May 6, 2011",
    "genre": "Fantasy",
    "director": {
      "name": "Kenneth Branagh",
      "bio": "placeholder bio",
      "birth year": "1960" },
  },
  {
    "title": "CAPTAIN AMERICA: THE FIRST AVENGER",
    "description": "It is 1941 and the world is in the throes of war. Steve Rogers (Chris Evans) wants to do his part and join America's armed forces, but the military rejects him because of his small stature. Finally, Steve gets his chance when he is accepted into an experimental program that turns him into a supersoldier called Captain America. Joining forces with Bucky Barnes (Sebastian Stan) and Peggy Carter (Hayley Atwell), Captain America leads the fight against the Nazi-backed HYDRA organization.",
    "release": "July 22, 2011",
    "genre": "Adventure",
    "director": {
      "name": "Joe Johnston",
      "bio": "Despite having received his start in film as a part of George Lucas' famed visual effects team on 'Star Wars' (1977), and eventually directing several high-profile movies himself, Joe Johnston somehow managed to keep a remarkably low-profile during much of his career. Originally intending to pursue a career in industrial design, Johnston's professional path took an unexpected turn when he answered an ad looking for illustrators to work on a new science fiction movie. That movie turned out to be 'Star Wars,' and from there Johnston worked as a visual effects director on that film's two sequels, in addition to similar duties on Steven Spielberg's 'Raiders of the Lost Ark' (1981). Encouraged by Lucas to try his hand at directing, Johnston enrolled in the University of Southern California's filmmaking program, although he continued to work on various Lucas/Spielberg projects. Shortly thereafter, Johnston was hired by Disney Studios to direct his first feature film, 'Honey, I Shrunk the Kids' (1989). Family-friendly material, filled with special effects became Johnston's stock in trade, exemplified by films like 'The Rocketeer' (1991) and 'Jumamji' (1995). Even as he made a name for himself as a director, Johnston continued to help fellow filmmakers with visual design work, including creating the initial drawing of the massive automaton for director Brad Bird's 'The Iron Giant' (1999). He also managed to deliver a more personal film with the acclaimed 'October Sky' (1999), before helming the special effects blockbuster 'Jurassic Park III' (2001). Johnston endured a few misfires, taking the reins of the horseracing epic 'Hildalgo' (2004) prior to landing the thankless task of salvaging the cursed remake 'The Wolfman' (2010). As a filmmaker, Johnston's legacy would be that of a competent director, perhaps too reliant upon visual wizardry. However, as an unsung hero and creative force on some of the most beloved movies of all time, Joe Johnston's lasting impact on cinema was already assured.",
      "birth year": "1950" },
  },
  {
    "title": "",
    "description": "",
    "release": "",
    "genre": "",
    "director": {
      "name": "",
      "bio": "placeholder bio",
      "birth year": "" },
  },
  {
    "title": "",
    "description": "",
    "release": "",
    "genre": "",
    "director": {
      "name": "",
      "bio": "placeholder bio",
      "birth year": "" },
  },
  {
    "title": "",
    "description": "",
    "release": "",
    "genre": "",
    "director": {
      "name": "",
      "bio": "placeholder bio",
      "birth year": "" },
  },
  {
    "title": "",
    "description": "",
    "release": "",
    "genre": "",
    "director": {
      "name": "",
      "bio": "placeholder bio",
      "birth year": "" },
  },
  {
    "title": "",
    "description": "",
    "release": "",
    "genre": "",
    "director": {
      "name": "",
      "bio": "placeholder bio",
      "birth year": "" },
  },
]

let users = [
  {
    "id": "1",
    "name": "Chris",
    "favoriteMovie": ["CAPTAIN AMERICA: THE FIRST AVENGER"]
  },
  {
    "id": "2",
    "name": "Skye",
    "favoriteMovie": ["Thor"],
  }
];

//READ
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
})

//READ
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.title === title );

  if (movie) {
    res.status(200).json(movie);
    
  } else {
    res.status(400).send('no such movie');
  }

})

//READ
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } =req.params;
  const genre = movies.find( movie => movie.genre === genreName).genre;

  if (genre) {
   res.status(200).json(genre);
  } else {
   res.status(400).send('no such genre')
  }
})

//READ
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } =req.params;
  const director = movies.find( movie => movie.director.name === directorName).director;

  if (director) {
   res.status(200).json(director);
  } else {
   res.status(400).send('no such director')
  }
})

//CREATE
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
      newUser.id= uuid.v4();
      users.push(newUser);
      res.status(201).json(newUser)
  } else {
      res.status(400).send('users need name')
  }
})

//CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } =req.params;
  

  let user = users.find( user => user.id == id );

  if (user) {
      user.favoriteMovie.push(movieTitle);
      res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
      res.status(400).send('no such user')
  }
})

//UPDATE
app.put('/users/:id', (req, res) => {
  const { id } =req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id );

  if (user) {
      user.name = updatedUser.name;
      res.status(200).json(user);
  } else {
      res.status(400).send('no such user')
  }
})

//DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } =req.params;
  

  let user = users.find( user => user.id == id );

  if (user) {
      user.favoriteMovie = user.favoriteMovie.filter( title => title !== movieTitle);
      res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
      res.status(400).send('no such user')
  }
})

//DELETE
app.delete('/users/:id', (req, res) => {
  const { id } =req.params;
  

  let user = users.find( user => user.id == id );

  if (user) {
      users = users.filter( user => user.id != id);
      //res.json(users)
      res.status(200).send(`user ${id} has been deleted`);
  } else {
      res.status(400).send('no such user')
  }
})


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