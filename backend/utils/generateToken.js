const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config/environment");

function generateToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
}

module.exports = generateToken;
