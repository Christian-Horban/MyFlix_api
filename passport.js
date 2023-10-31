const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  Models = require("./models.js"),
  passportJWT = require("passport-jwt");

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

/**
 * Local Strategy for authentication using a username and password.
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    /**
     * @function
     * @param {string} username - Username from login form.
     * @param {string} password - Password from login form.
     * @param {function} callback - Callback function.
     */
    (username, password, callback) => {
      console.log(username + "  " + password);
      Users.findOne({ Username: username }, (error, user) => {
        if (error) {
          console.log(error);
          return callback(error);
        }

        if (!user) {
          console.log("incorrect username");
          return callback(null, false, { message: "Incorrect username." });
        }

        if (!user.validatePassword(password)) {
          console.log("incorrect password");
          return callback(null, false, { message: "Incorrect password." });
        }

        console.log("finished");
        return callback(null, user);
      });
    }
  )
);

/**
 * JWT Strategy for authentication using JSON Web Tokens.
 */
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    /**
     * @function
     * @param {Object} jwtPayload - Decoded JWT payload.
     * @param {function} callback - Callback function.
     * @returns {Promise} Resolved promise with user object or rejected promise.
     */
    (jwtPayload, callback) => {
      return Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    }
  )
);
