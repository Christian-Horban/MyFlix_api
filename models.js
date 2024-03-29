const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * @typedef {Object} Genre
 * @property {string} Name - The name of the genre.
 * @property {string} Description - The description of the genre.
 */

/**
 * @typedef {Object} Director
 * @property {string} Name - The name of the director.
 * @property {string} Bio - The biography of the director.
 */

/**
 * Schema for a movie.
 * @type {mongoose.Schema}
 */
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
});

/**
 * Schema for a user.
 * @type {mongoose.Schema}
 */
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

/**
 * Hash a password.
 * @function
 * @memberof module:mongoose~Schema
 * @param {string} password - The password to hash.
 * @returns {string} The hashed password.
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Validate a password against the stored hashed password.
 * @function
 * @memberof module:mongoose~Schema
 * @this {mongoose.Document}
 * @param {string} password - The password to validate.
 * @returns {boolean} Whether the password is valid.
 */
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

/**
 * Mongoose model for a movie.
 * @type {mongoose.Model}
 */
let Movie = mongoose.model("Movie", movieSchema);

/**
 * Mongoose model for a director (using the movie schema).
 * @type {mongoose.Model}
 */
let Director = mongoose.model("Director", movieSchema);

/**
 * Mongoose model for a genre (using the movie schema).
 * @type {mongoose.Model}
 */
let Genre = mongoose.model("Genre", movieSchema);

/**
 * Mongoose model for a user.
 * @type {mongoose.Model}
 */
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
