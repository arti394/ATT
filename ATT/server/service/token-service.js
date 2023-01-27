const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {
      expiresIn: "30m",
    });
    return accessToken;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
