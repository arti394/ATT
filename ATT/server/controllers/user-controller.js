const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }
      const { username, email, password } = req.body;
      const userData = await userService.registration(
        username,
        email,
        password
      );
      res.cookie("accessToken", userData.accessToken, {
        maxAge: 30 * 24 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("accessToken", userData.accessToken, {
        maxAge: 30 * 24 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      await res.clearCookie("accessToken");
      return res.json("Success");
    } catch (e) {
      next(e);
    }
  }

  async postForm(req, res, next) {
    try {
      const { holiday, season } = req.body;
      const id = req.user.id;
      await userService.postForm(id, holiday, season);
      res.json("Success");
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
