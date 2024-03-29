/**
 * JWT secret key for signing.
 * This has to be the same key used in the JWTStrategy.
 * @type {string}
 */
const jwtSecret = "your_jwt_secret";

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport"); // Your local passport file

/**
 * Generates a JWT token for a user.
 *
 * @function
 * @param {Object} user - The user for whom the token is generated.
 * @returns {string} - The JWT token.
 */
function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: "7d",
    algorithm: "HS256", // This is the algorithm used to “sign” or encode the values of the JWT
  });
}

/**
 * Login route handler.
 *
 * @param {Object} router - The express router object.
 */
module.exports = (router) => {
  /**
   * Handle POST request for user login.
   *
   * @route POST /login
   * @group User - User related routes
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
